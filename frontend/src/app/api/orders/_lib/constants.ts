export const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || "http://localhost:4000/graphql";
export const GRAPHQL_TIMEOUT_MS = 10000;
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
export const JWT_SECRET = process.env.JWT_SECRET || "";
