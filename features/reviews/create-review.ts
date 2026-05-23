import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono/hono";
import { toast } from "react-toastify";
import { ReviewInsert } from "@/db/models/review";

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (json: ReviewInsert) => {
      const response = await client.api.reviews.$post({ json: json as any });
      if (!response.ok) {
        throw new Error("Failed to submit review");
      }
      const { data } = await response.json();
      return data;
    },
    onSuccess: (_, variables) => {
      toast.success("Review submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["reviews", variables.productId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
