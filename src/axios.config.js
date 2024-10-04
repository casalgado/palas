import axios from "axios";
const env = process.env.NODE_ENV || "development";
const baseUrl =
  env == "production"
    ? "https://store-v1-356723.ue.r.appspot.com"
    : "http://localhost:8080";

console.log("--- ENV ---");
console.log(env);
console.log(baseUrl);
const server = axios.create({
  baseURL: baseUrl,
  json: true,
});

export { server };

//  baseURL: "https://store-v1-356723.ue.r.appspot.com/",
