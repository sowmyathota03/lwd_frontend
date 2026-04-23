const RAW_API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, "");

const WS_BASE_URL = API_BASE_URL.replace(/\/api$/, "");
const SOCKET_URL = `${WS_BASE_URL}/ws-chat`;

export { API_BASE_URL, SOCKET_URL };