import axios from "axios";

const API_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: API_URL,
});

export const loginUser = (data) => api.post("/auth/login", data);
export const registerUser = (data) => api.post("/auth/register", data);
export const getTransactions = (token) =>
  api.get("/transactions", { headers: { Authorization: `Bearer ${token}` } });
export const addTransaction = (transaction, token) =>
  api.post("/transactions", transaction, { headers: { Authorization: `Bearer ${token}` } });
export const askAssistant = (question, token) =>
  api.post("/assistant/query", { question }, { headers: { Authorization: `Bearer ${token}` } });

export default api; // para poder hacer import api from "../api"
