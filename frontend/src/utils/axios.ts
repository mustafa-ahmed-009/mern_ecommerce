import axios from "axios";

// Read the base URL from Vite's environment variables
// It will automatically use the correct value based on dev vs. build mode
const apiBaseUrl = "http://localhost:3000/api/v1/" ;

// Optional: Add a check or fallback if needed, though Vite usually handles this
if (!apiBaseUrl) {
  console.warn(
    "VITE_API_BASE_URL is not defined! Falling back to default or erroring.",
  );
  // You could fallback to localhost here, or throw an error depending on preference
  // For example: apiBaseUrl = "http://localhost:3000/api/v1/";
}

console.log(`Using API Base URL: ${apiBaseUrl}`); // Good for debugging!

export const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
  withCredentials: true, // used for including credentials like (cookies, auth headers, TLS client certificates)
});
