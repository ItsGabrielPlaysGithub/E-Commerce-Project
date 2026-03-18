import { GRAPHQL_ENDPOINT, GRAPHQL_TIMEOUT_MS, IS_DEVELOPMENT } from "./constants";

export async function callGraphQL<TData>(query: string, variables: unknown): Promise<TData> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), GRAPHQL_TIMEOUT_MS);

  try {
    if (IS_DEVELOPMENT) {
      console.log(`[GraphQL] Calling endpoint: ${GRAPHQL_ENDPOINT}`);
    }

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
    });

    const rawText = await response.text();

    let parsed: { data?: TData; errors?: Array<{ message?: string }> };
    try {
      parsed = JSON.parse(rawText);
    } catch {
      if (IS_DEVELOPMENT) {
        console.error("[GraphQL] Invalid JSON response");
      }
      throw new Error("Backend service error");
    }

    if (parsed.errors && parsed.errors.length > 0) {
      const errorMessage = parsed.errors[0]?.message || "Backend validation error";
      if (IS_DEVELOPMENT) {
        console.error("[GraphQL] Backend error:", {
          message: errorMessage,
          allErrors: parsed.errors,
          response: rawText,
        });
      }
      throw new Error(errorMessage);
    }

    if (!parsed.data) {
      throw new Error("Backend service error");
    }

    return parsed.data;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timeout - backend service is slow");
    }
    throw error instanceof Error ? error : new Error("Backend service error");
  } finally {
    clearTimeout(timeoutId);
  }
}
