import { tablesDB } from "@/lib/appwrite";
import type { ProductAllPeriod } from "@/model/products";

const DATABASE_ID = "68d021ad002fe84e49fb";
const COLLECTION_ID_PRODUCTS = "produtos";

export const fetchProductsAllPeriod = async (): Promise<ProductAllPeriod[]> => {
  try {
    const response = await tablesDB.listRows<ProductAllPeriod>({
      databaseId: DATABASE_ID,
      tableId: COLLECTION_ID_PRODUCTS,
    });
    return response.rows;
  } catch (error) {
    console.error("Erro ao buscar produtos por:", error);

    return [];
  }
};
