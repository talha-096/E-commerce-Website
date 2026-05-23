import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono/hono";
import { OrderSelect } from "@/db/models/order";

export const useGetOrders = (userId?: string) => {
  return useQuery({
    queryKey: ["orders", userId],
    queryFn: async () => {
      const response = await client.api.orders.$get({
        query: userId ? { userId } : undefined,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const { data } = await response.json();
      return data as OrderSelect[];
    },
    enabled: userId !== undefined,
  });
};
