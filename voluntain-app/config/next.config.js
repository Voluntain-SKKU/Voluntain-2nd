const production = process.env.NODE_ENV === "production";

module.exports = {
  // Use the CDN in production and localhost for development.
  // assetPrefix: production ? 'https://cdn.mydomain.com' : '',
  assetPrefix: production? "." : "", // css, js 파일 경로를 relative로 설정하기 위해 prefix 필요함
  url: production?"http://3.36.123.115:1337": "http://localhost:1337",
}

// export const url = "http://3.36.123.115:1337";
// export const url = production?
  // "http://3.36.123.115:1337" 
  // : "http://localhost:1337"; 
