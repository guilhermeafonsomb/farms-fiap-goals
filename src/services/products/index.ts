import type { Models } from "appwrite";
import { tablesDB } from "@/lib/appwrite";

const DATABASE_ID = "68d021ad002fe84e49fb";
const COLLECTION_ID_PRODUCTS = "produtos";

export type ProductAllPeriod = Models.Row & {
  nome: string;
  lucro: number;
  vendas: number;
  periodo: "Semanal" | "Mensal" | "Anual";
  meta: number;
};

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
