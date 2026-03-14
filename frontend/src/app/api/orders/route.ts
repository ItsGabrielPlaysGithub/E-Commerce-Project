import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { callGraphQL } from "./_lib/graphql";
import { CREATE_ORDER_MUTATION } from "./_lib/queries";
import { checkRateLimit, getClientIdentifier } from "./_lib/rateLimit";
import { getAuthenticatedUserId, isSameOrigin } from "./_lib/security";
import { getAuthoritativePrices, parseProductId } from "./_lib/products";
import { validateOrderPayload } from "./_lib/validation";
import { IS_DEVELOPMENT } from "./_lib/constants";
import { CreateOrderMutationResult, PlaceOrderRequest } from "./_lib/types";

export async function POST(request: NextRequest) {
  try {
    if (!isSameOrigin(request)) {
      return NextResponse.json(
        { error: "Invalid request origin." },
        { status: 403 },
      );
    }

    const authenticatedUserId = getAuthenticatedUserId(request);
    if (!authenticatedUserId) {
      return NextResponse.json(
        { error: "Authentication required to place order." },
        { status: 401 },
      );
    }

    const clientId = getClientIdentifier(request.headers);
    
    if (!checkRateLimit(clientId, 10, 60000)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as PlaceOrderRequest;

    const validation = validateOrderPayload(body);
    if (!validation.ok) {
      return NextResponse.json(
        { error: validation.error ?? "Invalid request." },
        { status: validation.status ?? 400 },
      );
    }

    const orderNumber = `OMG-${randomUUID().replace(/-/g, "").slice(0, 12).toUpperCase()}`;
    const createdOrders = [];
    const productPriceMap = await getAuthoritativePrices();

    for (let i = 0; i < body.items.length; i++) {
      const item = body.items[i];
      const parsedProductId = parseProductId(item.productId);
      if (!parsedProductId) {
        throw new Error("Invalid product identifier.");
      }

      const authoritativeUnitPrice = productPriceMap.get(parsedProductId);
      if (typeof authoritativeUnitPrice !== "number") {
        return NextResponse.json(
          { error: "Product not found. Please refresh products and try again." },
          { status: 400 },
        );
      }

      if (IS_DEVELOPMENT) {
        console.log(`[API] Creating order ${i + 1}/${body.items.length}`);
      }

      try {
        const result = await callGraphQL<CreateOrderMutationResult>(CREATE_ORDER_MUTATION, {
          input: {
            productId: parsedProductId,
            userId: authenticatedUserId,
            quantity: item.quantity,
            unitPrice: authoritativeUnitPrice,
            totalPrice: item.quantity * authoritativeUnitPrice,
          },
        });

        createdOrders.push(result);
      } catch (error) {
        if (IS_DEVELOPMENT) {
          console.error(`[API] Failed to create order item ${i + 1}:`, error);
        }
        throw new Error("Failed to process order. Please try again.");
      }
    }

    // Success
    return NextResponse.json({
      success: true,
      orderNumber,
      message: "Order placed successfully",
      itemsCount: body.items.length,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to place order";

    if (IS_DEVELOPMENT) {
      console.error("[API] Order placement error:", errorMessage);
    }

    // Return generic error message to client (don't expose internals)
    return NextResponse.json(
      {
        success: false,
        error: errorMessage.includes("Authentication") || errorMessage.includes("Invalid")
          ? errorMessage
          : "Failed to place order. Please try again.",
      },
      { status: 500 }
    );
  }
}
