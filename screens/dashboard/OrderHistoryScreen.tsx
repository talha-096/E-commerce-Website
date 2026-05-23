"use client";

import { useGetOrders } from "@/features/orders/get-orders";
import MainLayout from "@/components/common/layouts/main/MainLayout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function OrderHistoryScreen() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    fetchUser();
  }, []);

  const { data: orders, isLoading } = useGetOrders(userId || "");
  if (isLoading) {
    return (
      <MainLayout className="min-h-[50vh] flex justify-center items-center">
        <p>Loading orders...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout className="py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>
      
      {!orders || orders.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <p className="text-gray-500">You have no orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-xl p-6 bg-white shadow-sm">
              <div className="flex justify-between items-center mb-4 border-b pb-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium text-gray-900">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(order.createdAt || "").toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-medium text-primary">${order.totalAmount}.00</p>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                    order.status === "Delivered" ? "bg-green-100 text-green-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Assuming items is an array of objects with name, price, quantity, image */}
                {((order.items as any[]) || []).map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-16 h-16 relative bg-gray-100 rounded overflow-hidden">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900">${item.price * item.quantity}.00</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </MainLayout>
  );
}
