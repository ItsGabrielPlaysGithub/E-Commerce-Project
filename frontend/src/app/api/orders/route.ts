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
    const failedItems: { index: number; error: string }[] = [];

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
        console.log(`[API] Creating order ${i + 1}/${body.items.length}:`, {
          productId: parsedProductId,
          quantity: item.quantity,
          userId: authenticatedUserId,
        });
      }

      try {
        const result = await callGraphQL<CreateOrderMutationResult>(CREATE_ORDER_MUTATION, {
          input: {
            productId: parsedProductId,
            userId: authenticatedUserId,
            orderNumber,
            quantity: item.quantity,
            unitPrice: authoritativeUnitPrice,
            totalPrice: item.quantity * authoritativeUnitPrice,
          },
        });

        if (IS_DEVELOPMENT) {
          console.log(`[API] Order item ${i + 1} created successfully:`, result);
        }

        createdOrders.push(result);
      } catch (error) {
        const itemError = error instanceof Error ? error.message : String(error);
        if (IS_DEVELOPMENT) {
          console.error(`[API] Failed to create order item ${i + 1}:`, {
            item,
            error: itemError,
            stack: error instanceof Error ? error.stack : undefined,
          });
        }
        failedItems.push({ index: i, error: itemError });
      }
    }

    // If all items failed, throw error
    if (createdOrders.length === 0) {
      const errorMessage = failedItems.map((f) => `Item ${f.index + 1}: ${f.error}`).join("; ");
      throw new Error(errorMessage || "Failed to create any order items.");
    }

    // If some items failed, log warning but continue (partial success)
    if (failedItems.length > 0 && IS_DEVELOPMENT) {
      console.warn(`[API] Partial order failure: ${createdOrders.length}/${body.items.length} items created`, failedItems);
    }

    // Success
    return NextResponse.json({
      success: true,
      orderNumber,
      message: "Order placed successfully",
      itemsCount: createdOrders.length,
      failedItems: failedItems.length > 0 ? failedItems : undefined,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to place order";
    const errorStack = error instanceof Error ? error.stack : "";

    if (IS_DEVELOPMENT) {
      console.error("[API] Order placement error:", {
        message: errorMessage,
        stack: errorStack,
        error,
      });
    }

    // Return generic error message to client (don't expose internals)
    return NextResponse.json(
      {
        success: false,
        error: errorMessage.includes("Authentication") || errorMessage.includes("Invalid")
          ? errorMessage
          : "Failed to place order. Please try again.",
        ...(IS_DEVELOPMENT && { debugError: errorMessage }),
      },
      { status: 500 }
    );
  }
}
