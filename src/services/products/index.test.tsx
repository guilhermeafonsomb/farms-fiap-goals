import { describe, it, expect } from "vitest";
import { fetchProductsAllPeriod } from "./index";
import { COLLECTION_ID, DATABASE_ID } from "@/lib/mocks/handlers";

describe("fetch Products All Period", () => {
  it("should return mocked list of products", async () => {
    const products = await fetchProductsAllPeriod();

    expect(products).toHaveLength(2);
    expect(products[0]).toMatchObject({
      nome: "Produto A",
      lucro: 1000,
      vendas: 50,
      periodo: "Mensal",
      meta: 1500,
    });
    expect(products[1]).toMatchObject({
      nome: "Produto B",
      lucro: 2000,
      vendas: 100,
      periodo: "Semanal",
      meta: 2500,
    });
  });

  it("should return empty array on error", async () => {
    const { server } = await import("@/lib/mocks/server");
    const { http, HttpResponse } = await import("msw");

    server.use(
      http.get(
        `https://nyc.cloud.appwrite.io/v1/tablesdb/${DATABASE_ID}/tables/${COLLECTION_ID}/rows`,
        () => {
          return HttpResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
          );
        }
      )
    );

    const products = await fetchProductsAllPeriod();

    expect(products).toEqual([]);
  });
});
