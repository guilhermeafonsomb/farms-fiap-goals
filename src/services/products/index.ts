import type { Models } from "appwrite";
import { tablesDB } from "../../lib/appwrite";

const DATABASE_ID = "68d021ad002fe84e49fb";
const COLLECTION_ID_PRODUTOS = "produtos";

export type ProdutoAllPeriod = Models.Row & {
  nome: string;
  lucro: number;
  vendas: number;
  periodo: "Semanal" | "Mensal" | "Anual";
  meta: number;
};

export const fetchProductsAllPeriod = async (): Promise<ProdutoAllPeriod[]> => {
  const response = await tablesDB.listRows<ProdutoAllPeriod>({
    databaseId: DATABASE_ID,
    tableId: COLLECTION_ID_PRODUTOS,
  });
  return response.rows;
};
