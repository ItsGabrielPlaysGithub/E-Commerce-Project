import { NextRequest, NextResponse } from "next/server";

type UserRole = "partner" | "consumer";

type PersistedCartItem = {
  productId: string;
  qty: number;
  selectedColor?: string;
  selectedSize?: string;
  unitPrice: number;
};

type CartStatePayload = {
  items: PersistedCartItem[];
};

type CartCookiePayload = {
  carts: Record<string, CartStatePayload>;
};

const CART_COOKIE_NAME = "cart_state";
const DEFAULT_OWNER = "guest";
const DEFAULT_STATE: CartStatePayload = {
  items: [],
};

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const parts = token.split(".");
  if (parts.length < 2) return null;

  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    return JSON.parse(Buffer.from(padded, "base64").toString("utf-8")) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function resolveOwnerKey(request: NextRequest): string {
  const token = request.cookies.get("access_token")?.value;
  if (!token) return DEFAULT_OWNER;

  const payload = decodeJwtPayload(token);
  if (!payload) return DEFAULT_OWNER;

  if (!isUserRole(payload.role)) {
    return DEFAULT_OWNER;
  }

  const userId = payload.userId;
  if (typeof userId === "number") {
    return `user:${userId}`;
  }

  const emailAddress = payload.emailAddress;
  if (typeof emailAddress === "string" && emailAddress.length > 0) {
    return `email:${emailAddress.toLowerCase()}`;
  }

  return DEFAULT_OWNER;
}

function isUserRole(value: unknown): value is UserRole {
  return value === "partner" || value === "consumer";
}

function sanitizeItems(items: unknown): PersistedCartItem[] {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const candidate = item as Record<string, unknown>;
      const productId = candidate.productId;
      const qty = candidate.qty;
      const unitPrice = candidate.unitPrice;

      if (typeof productId !== "string" || productId.length === 0) return null;
      if (typeof qty !== "number" || !Number.isInteger(qty) || qty < 1) return null;
      if (typeof unitPrice !== "number" || Number.isNaN(unitPrice) || unitPrice < 0) return null;

      return {
        productId,
        qty,
        unitPrice,
        selectedColor: typeof candidate.selectedColor === "string" ? candidate.selectedColor.slice(0, 64) : undefined,
        selectedSize: typeof candidate.selectedSize === "string" ? candidate.selectedSize.slice(0, 64) : undefined,
      } as PersistedCartItem;
    })
    .filter((item): item is PersistedCartItem => item !== null);
}

function sanitizeCartState(rawState: unknown): CartStatePayload {
  if (!rawState || typeof rawState !== "object") {
    return DEFAULT_STATE;
  }

  const parsedState = rawState as Record<string, unknown>;

  return {
    items: sanitizeItems(parsedState.items),
  };
}

function parseCookieState(rawCookieValue: string | undefined): CartCookiePayload {
  if (!rawCookieValue) {
    return { carts: {} };
  }

  try {
    const decoded = Buffer.from(rawCookieValue, "base64url").toString("utf-8");
    const parsed = JSON.parse(decoded) as Record<string, unknown>;

    const rawCarts = parsed.carts;
    if (!rawCarts || typeof rawCarts !== "object") {
      return { carts: {} };
    }

    const carts: Record<string, CartStatePayload> = {};

    for (const [ownerKey, rawState] of Object.entries(rawCarts as Record<string, unknown>)) {
      if (ownerKey.length === 0) continue;
      carts[ownerKey] = sanitizeCartState(rawState);
    }

    return { carts };
  } catch {
    return { carts: {} };
  }
}

function encodeCookieState(payload: CartCookiePayload): string {
  return Buffer.from(JSON.stringify(payload), "utf-8").toString("base64url");
}

export async function GET(request: NextRequest) {
  const ownerKey = resolveOwnerKey(request);
  const rawCookieValue = request.cookies.get(CART_COOKIE_NAME)?.value;
  const payload = parseCookieState(rawCookieValue);
  const state = payload.carts[ownerKey] || DEFAULT_STATE;

  return NextResponse.json({ items: state.items });
}

export async function PUT(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const parsedBody = body as Record<string, unknown>;
  const ownerKey = resolveOwnerKey(request);
  const items = sanitizeItems(parsedBody.items);

  const rawCookieValue = request.cookies.get(CART_COOKIE_NAME)?.value;
  const payload = parseCookieState(rawCookieValue);
  payload.carts[ownerKey] = {
    items,
  };

  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: CART_COOKIE_NAME,
    value: encodeCookieState(payload),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
