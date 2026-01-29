import { http, HttpResponse } from "msw";
import {
  APPWRITE_DATABASE,
  APPWRITE_ENDPOINT,
  COLLECTION_ID_PRODUCTS,
} from "../appwrite";

const mockProducts = [
  {
    $id: "1",
    $createdAt: "2024-01-01T00:00:00.000Z",
    $updatedAt: "2024-01-01T00:00:00.000Z",
    name: "Produto A",
    profit: 1000,
    sales: 50,
    period: "Mensal" as const,
    goals: 1500,
  },
  {
    $id: "2",
    $createdAt: "2024-01-01T00:00:00.000Z",
    $updatedAt: "2024-01-01T00:00:00.000Z",
    name: "Produto B",
    profit: 2000,
    sales: 100,
    period: "Semanal" as const,
    goals: 2500,
  },
];

export const handlers = [
  http.get(
    `${APPWRITE_ENDPOINT}/tablesdb/${APPWRITE_DATABASE}/tables/${COLLECTION_ID_PRODUCTS}/rows`,
    () => {
      return HttpResponse.json({
        total: mockProducts.length,
        rows: mockProducts,
      });
    },
  ),
];
