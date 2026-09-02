"use client";

import React, { useState } from "react";
import ProductCard, { ProductType } from "@/components/ui/ProductCard";
import QuickViewModal from "@/components/ui/QuickViewModal";

interface ProductGridClientProps {
  products: ProductType[];
}

export default function ProductGridClient({ products }: ProductGridClientProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<ProductType | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const handleQuickView = (product: ProductType) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setQuickViewOpen(false);
    // Delay clearing the product so the close animation plays
    setTimeout(() => setQuickViewProduct(null), 200);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={handleQuickView}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-hok-stone bg-white rounded-md border border-hok-mist">
            <p className="text-xl font-playfair mb-2">No products found</p>
            <p className="text-sm">Try adjusting your filters or search criteria.</p>
          </div>
        )}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={quickViewOpen}
        onClose={handleCloseQuickView}
      />
    </>
  );
}
