import { describe, it, expect } from "vitest";
import { fetchProductsAllPeriod } from "./index";
import {
  APPWRITE_DATABASE,
  APPWRITE_ENDPOINT,
  COLLECTION_ID_PRODUCTS,
} from "@/lib/appwrite";

describe("fetch Products All Period", () => {
  it("should return mocked list of products", async () => {
    const products = await fetchProductsAllPeriod();

    expect(products).toHaveLength(2);
    expect(products[0]).toMatchObject({
      name: "Produto A",
      profit: 1000,
      sales: 50,
      period: "Mensal",
      goals: 1500,
    });
    expect(products[1]).toMatchObject({
      name: "Produto B",
      profit: 2000,
      sales: 100,
      period: "Semanal",
      goals: 2500,
    });
  });

  it("should return empty array on error", async () => {
    const { server } = await import("@/lib/mocks/server");
    const { http, HttpResponse } = await import("msw");

    server.use(
      http.get(
        `${APPWRITE_ENDPOINT}/tablesdb/${APPWRITE_DATABASE}/tables/${COLLECTION_ID_PRODUCTS}/rows`,
        () => {
          return HttpResponse.json(
            { message: "Internal Server Error" },
            { status: 500 },
          );
        },
      ),
    );

    const products = await fetchProductsAllPeriod();

    expect(products).toEqual([]);
  });
});
