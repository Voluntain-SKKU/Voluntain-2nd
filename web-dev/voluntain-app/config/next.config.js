const production = process.env.NODE_ENV === "production";

export const url = production
  ? "https://www.yoursite.com"
  : "https://localhost:1337";