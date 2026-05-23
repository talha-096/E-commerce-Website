"use client";

import { useGetProduct } from "@/features/products/get-product";
import { useGetReviews } from "@/features/reviews/get-reviews";
import MainLayout from "@/components/common/layouts/main/MainLayout";
import Image from "next/image";
import CartActionButtons from "@/components/shared/ProductCard/CartActionButtons";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

interface Props {
  productId: string;
}

export default function ProductDetailScreen({ productId }: Props) {
  const { data: product, isLoading: productLoading } = useGetProduct(productId);
  const { data: reviews, isLoading: reviewsLoading } = useGetReviews(productId);

  if (productLoading) {
    return (
      <MainLayout className="min-h-[50vh] flex justify-center items-center">
        <p>Loading product...</p>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout className="min-h-[50vh] flex justify-center items-center">
        <p>Product not found.</p>
      </MainLayout>
    );
  }

  const images = (product.images as string[]) || [];
  const mainImage = images[0] || "https://placehold.co/600x600?text=No+Image";

  return (
    <MainLayout className="py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto">
              {images.map((img, i) => (
                <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border cursor-pointer hover:border-primary">
                  <Image src={img} alt={`Preview ${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-xl text-primary font-semibold mt-2">${product.price}.00</p>
          </div>

          <p className="text-gray-600">{product.shortDescription}</p>

          {/* Add to Cart logic */}
          <div className="pt-4 border-t">
            <CartActionButtons
              cartValue={0} // Needs actual local storage hook wiring
              currentStock={product.stock}
              productId={product.id}
            />
          </div>

          <div className="pt-4">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{product.longDescription}</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16 pt-8 border-t">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        {reviewsLoading ? (
          <p>Loading reviews...</p>
        ) : reviews && reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((r) => (
              <div key={r.id} className="p-4 rounded-xl bg-gray-50">
                <div className="flex items-center gap-2 mb-2 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    i < r.rating ? <BsStarFill key={i} /> : <BsStar key={i} />
                  ))}
                </div>
                <p className="text-gray-800">{r.comment}</p>
                <span className="text-sm text-gray-500 block mt-2">
                  {new Date(r.createdAt || "").toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </MainLayout>
  );
}
