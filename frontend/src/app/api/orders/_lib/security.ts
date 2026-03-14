import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest } from "next/server";
import { IS_DEVELOPMENT, JWT_SECRET } from "./constants";
import { JwtPayload } from "./types";

function b64UrlDecode(input: string): string {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return Buffer.from(padded, "base64").toString("utf-8");
}

function extractToken(token: string | undefined): string | null {
  if (!token) return null;
  return token.trim() === "" ? null : token;
}

function verifyHs256Jwt(token: string, secret: string): JwtPayload | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [headerPart, payloadPart, signaturePart] = parts;
  const data = `${headerPart}.${payloadPart}`;

  let header: { alg?: string };
  let payload: JwtPayload;
  try {
    header = JSON.parse(b64UrlDecode(headerPart));
    payload = JSON.parse(b64UrlDecode(payloadPart));
  } catch {
    return null;
  }

  if (header.alg !== "HS256") return null;

  const expectedSignature = createHmac("sha256", secret).update(data).digest();
  const receivedSignature = Buffer.from(
    signaturePart
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(signaturePart.length + ((4 - (signaturePart.length % 4)) % 4), "="),
    "base64",
  );

  if (expectedSignature.length !== receivedSignature.length) return null;
  if (!timingSafeEqual(expectedSignature, receivedSignature)) return null;

  if (typeof payload.exp === "number") {
    const nowEpochSeconds = Math.floor(Date.now() / 1000);
    if (payload.exp <= nowEpochSeconds) return null;
  }

  return payload;
}

export function getAuthenticatedUserId(request: NextRequest): number | null {
  if (!JWT_SECRET || JWT_SECRET.trim() === "") {
    if (IS_DEVELOPMENT) {
      console.error("[API] JWT_SECRET not configured in environment (required for token verification)");
    }
    return null;
  }

  const accessTokenCookie = request.cookies.get("access_token");
  const rawToken = extractToken(accessTokenCookie?.value);
  
  if (!rawToken) {
    if (IS_DEVELOPMENT) {
      console.warn("[API] No access_token cookie found in request. User not authenticated.");
      console.debug("[API] Cookies available:", Array.from(request.cookies).map(([k]) => k));
    }
    return null;
  }

  const payload = verifyHs256Jwt(rawToken, JWT_SECRET);
  if (!payload) {
    if (IS_DEVELOPMENT) {
      console.warn("[API] Failed to verify JWT signature or token is expired");
    }
    return null;
  }

  if (typeof payload.userId !== "number" || payload.userId <= 0) {
    if (IS_DEVELOPMENT) {
      console.warn("[API] Invalid or missing userId in token payload", { userId: payload.userId });
    }
    return null;
  }

  return payload.userId;
}

export function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  return origin === request.nextUrl.origin;
}
