import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono/hono";

export const useGetSellerProducts = (sellerId?: string) => {
  return useQuery({
    queryKey: ["seller-products", sellerId],
    queryFn: async () => {
      const response = await client.api.seller.products.$get({
        query: sellerId ? { sellerId } : undefined,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch seller products");
      }
      const { data } = await response.json();
      return data;
    },
    enabled: sellerId !== undefined,
  });
};

export const useGetSellerOrders = (sellerId?: string) => {
  return useQuery({
    queryKey: ["seller-orders", sellerId],
    queryFn: async () => {
      const response = await client.api.seller.orders.$get({
        query: sellerId ? { sellerId } : undefined,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch seller orders");
      }
      const { data } = await response.json();
      return data;
    },
    enabled: sellerId !== undefined,
  });
};
