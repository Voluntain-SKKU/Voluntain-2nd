const production = process.env.NODE_ENV === "production";

export const url = production
  ? "http://www.yoursite.com"
  : "http://localhost:1337";
  // : "http://3.35.229.197:1337";
