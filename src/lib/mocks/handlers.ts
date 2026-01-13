import { http, HttpResponse } from "msw";

export const APPWRITE_ENDPOINT = "https://nyc.cloud.appwrite.io/v1";
export const DATABASE_ID = "68d021ad002fe84e49fb";
export const COLLECTION_ID = "produtos";

const mockProducts = [
  {
    $id: "1",
    $createdAt: "2024-01-01T00:00:00.000Z",
    $updatedAt: "2024-01-01T00:00:00.000Z",
    nome: "Produto A",
    lucro: 1000,
    vendas: 50,
    periodo: "Mensal" as const,
    meta: 1500,
  },
  {
    $id: "2",
    $createdAt: "2024-01-01T00:00:00.000Z",
    $updatedAt: "2024-01-01T00:00:00.000Z",
    nome: "Produto B",
    lucro: 2000,
    vendas: 100,
    periodo: "Semanal" as const,
    meta: 2500,
  },
];

export const handlers = [
  http.get(
    `${APPWRITE_ENDPOINT}/tablesdb/${DATABASE_ID}/tables/${COLLECTION_ID}/rows`,
    () => {
      return HttpResponse.json({
        total: mockProducts.length,
        rows: mockProducts,
      });
    }
  ),
];
