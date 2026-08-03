"use client";

import { formatPrice } from "@/utils/formatPrice";
import { useProductsBySkinType } from "@/utils/hooks/useProductsBySkinType";
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Button } from "./button";
import ProductCard from "./ProductCard";

interface QuizResultsProps {
  skinType: string;
  resetQuiz: () => void;
  answers: Record<number, number>;
}

const skinTypeDescriptions = {
  "dry-skin": "You have dry skin; needs deep hydration and gentle care.",
  "normal-skin": "You have normal skin; maintain balance with gentle products.",
  "oily-skin": "You have oily skin; needs oil control and gentle exfoliation.",
};

const PRODUCTS_PER_PAGE = 9; // Increased to show 3x3 grid on large screens
const MAX_PAGES_SHOWN = 5; // Show max 5 page numbers at a time

const QuizResults: React.FC<QuizResultsProps> = ({
  skinType,
  resetQuiz,
  answers,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Check if all answers are option 3 (index 2) for oily skin
  const isAllOily = Object.values(answers).every((answer) => answer === 2);

  // Only fetch oily skin products if all answers are option 3
  const {
    data: SkinProducts,
    isLoading,
    error,
  } = useProductsBySkinType(skinType);

  // Memoize pagination calculations to prevent unnecessary recalculations
  const { totalProducts, totalPages, currentProducts, visiblePageNumbers } =
    useMemo(() => {
      const totalProducts = SkinProducts?.edges.length || 0;
      const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
      const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
      const endIndex = startIndex + PRODUCTS_PER_PAGE;
      const currentProducts =
        SkinProducts?.edges.slice(startIndex, endIndex) || [];

      // Calculate visible page numbers
      let start = Math.max(1, currentPage - Math.floor(MAX_PAGES_SHOWN / 2));
      let end = Math.min(totalPages, start + MAX_PAGES_SHOWN - 1);

      // Adjust start if we're near the end
      if (end - start + 1 < MAX_PAGES_SHOWN) {
        start = Math.max(1, end - MAX_PAGES_SHOWN + 1);
      }

      const visiblePageNumbers = Array.from(
        { length: end - start + 1 },
        (_, i) => start + i,
      );

      return {
        totalProducts,
        totalPages,
        currentProducts,
        visiblePageNumbers,
      };
    }, [SkinProducts, currentPage]);

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of products section
    document
      .getElementById("products-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin" />
          <p className="font-montserrat mt-4 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="font-montserrat text-lg text-red-600">
            Failed to load products. Please try again later.
          </p>
          <Button
            variant="ghost"
            onClick={resetQuiz}
            className="text-burntOrange mt-4 flex items-center font-medium"
          >
            <ArrowLeft />
            BACK TO QUIZ
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 md:px-8">
      <div className="mb-10 text-center">
        <h2 className="font-fondamento mb-4 text-3xl text-hok-espresso md:text-4xl">
          Your Personalized Routine
        </h2>
        <div className="bg-hok-champagne mx-auto h-1 w-16 rounded-full" />
      </div>

      <div className="mb-10 rounded-2xl border border-hok-champagne/30 bg-hok-ivory p-6 text-center shadow-sm">
        <span className="font-outfit mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-hok-champagne">
          Skin Profile
        </span>
        <p className="font-outfit text-lg font-light text-hok-espresso">
          {skinTypeDescriptions[skinType as keyof typeof skinTypeDescriptions]}
        </p>
      </div>

      {SkinProducts && (
        <>
          <div id="products-section">
            <div className="mb-8 flex items-center justify-between border-b border-hok-mist pb-4">
              <h3 className="font-outfit text-xl font-medium text-hok-espresso">
                Recommended Products
              </h3>
              {totalProducts > 0 && (
                <span className="rounded-full bg-hok-linen px-3 py-1 text-sm font-light text-hok-stone">
                  {totalProducts} items
                </span>
              )}
            </div>

            {currentProducts.length === 0 ? (
              <p className="font-montserrat text-center text-lg text-gray-600">
                No products found for your skin type.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
                {currentProducts.map(({ node }) => (
                  <ProductCard
                    key={node.handle}
                    product={{
                      id: node.handle,
                      title: node.title,
                      handle: node.handle,
                      price: node.priceRange.minVariantPrice.amount,
                      currencyCode: node.priceRange.minVariantPrice.currencyCode,
                      image: node.media.edges[0]?.node.image?.src || "",
                      availableForSale: node.availableForSale,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-10 w-10"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {visiblePageNumbers.map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                        currentPage === pageNumber
                          ? "border-hok-champagne bg-hok-champagne text-white"
                          : "border-hok-mist bg-white text-hok-stone hover:border-hok-stone hover:text-hok-espresso"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-10 w-10 rounded-full border-hok-mist text-hok-stone hover:border-hok-stone hover:text-hok-espresso"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <div className="mt-12 flex justify-center border-t border-hok-mist pt-8">
        <Button
          variant="outline"
          onClick={resetQuiz}
          className="font-outfit flex items-center rounded-full border-hok-mist px-8 font-medium tracking-[0.1em] text-hok-stone transition-all duration-300 hover:border-hok-stone hover:bg-hok-ivory hover:text-hok-espresso"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          RETAKE QUIZ
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;
