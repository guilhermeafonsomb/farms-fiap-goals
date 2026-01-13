import type { Models } from "appwrite";

export type ProductAllPeriod = Models.Row & {
  nome: string;
  lucro: number;
  vendas: number;
  periodo: "Semanal" | "Mensal" | "Anual";
  meta: number;
};
