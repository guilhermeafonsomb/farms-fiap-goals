import {
  APPWRITE_DATABASE,
  COLLECTION_ID_PRODUCTS,
  tablesDB,
} from "@/lib/appwrite";
import type { ProductAllPeriod } from "@/model/products";

export const fetchProductsAllPeriod = async (): Promise<ProductAllPeriod[]> => {
  try {
    const response = await tablesDB.listRows({
      databaseId: APPWRITE_DATABASE,
      tableId: COLLECTION_ID_PRODUCTS,
    });
    return response.rows as unknown as ProductAllPeriod[];
  } catch (error) {
    console.error("Erro ao buscar produtos por:", error);

    return [];
  }
};
