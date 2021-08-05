const production = process.env.NODE_ENV === "production";

export const url = production
  ? "http://www.yoursite.com"
  //: "http://www.voluntain.tk";
  : "http://localhost:1337";