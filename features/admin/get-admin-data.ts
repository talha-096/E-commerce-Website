import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono/hono";

export const useGetAdminStats = () => {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const response = await client.api.admin.stats.$get();
      if (!response.ok) throw new Error("Failed to fetch admin stats");
      const { data } = await response.json();
      return data;
    },
  });
};

export const useGetAdminUsers = () => {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const response = await client.api.admin.users.$get();
      if (!response.ok) throw new Error("Failed to fetch admin users");
      const { data } = await response.json();
      return data;
    },
  });
};

export const useGetAdminOrders = () => {
  return useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const response = await client.api.admin.orders.$get();
      if (!response.ok) throw new Error("Failed to fetch admin orders");
      const { data } = await response.json();
      return data;
    },
  });
};
