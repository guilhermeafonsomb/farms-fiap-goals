import { useQuery } from "@tanstack/react-query";
import { fetchProductsAllPeriod } from "@/services/products";

export function useProductsAllPeriod() {
  return useQuery({
    queryKey: ["products-all-period"],
    queryFn: fetchProductsAllPeriod,
  });
}
