import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono/hono";
import { ReviewSelect } from "@/db/models/review";

export const useGetReviews = (productId: string) => {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const response = await client.api.reviews.$get({
        query: { productId },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const { data } = await response.json();
      return data as ReviewSelect[];
    },
    enabled: !!productId,
  });
};
