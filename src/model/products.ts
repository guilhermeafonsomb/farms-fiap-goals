export type ProductAllPeriod = {
  $id: string;
  name: string;
  profit: number;
  sales: number;
  period: "WEEKLY" | "MONTHLY" | "ANNUAL";
  goals: number;
};
