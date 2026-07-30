"use client";

import { formatPrice } from "@/utils/formatPrice";
import { useProductsBySkinType } from "@/utils/hooks/useProductsBySkinType";
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Button } from "./button";

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
    <div className="my-8">
      <h2 className="font-playfair text-6xl">
        Personalized <br /> Skincare Quiz
      </h2>
      <h3 className="font-playfair my-6 text-3xl">Results</h3>

      <div className="bg-[#73512C] font-montserrat mt-10 mb-8 w-fit max-w-fit rounded-[28px] px-5 py-[10px] text-lg font-semibold text-white">
        Determing Your Skin Type
      </div>

      <div className="border-gold mb-8 rounded-lg border bg-white p-4">
        <p className="font-montserrat text-lg">
          {skinTypeDescriptions[skinType as keyof typeof skinTypeDescriptions]}
        </p>
      </div>

      {SkinProducts && (
        <>
          <div id="products-section">
            <h3 className="font-montserrat mb-12 w-fit max-w-fit rounded bg-white px-5 py-[10px] text-lg font-semibold">
              Recommended Products for{" "}
              {skinType
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
              {totalProducts > 0 && (
                <span className="ml-2 text-gray-500">
                  ({totalProducts} products)
                </span>
              )}
            </h3>

            {currentProducts.length === 0 ? (
              <p className="font-montserrat text-center text-lg text-gray-600">
                No products found for your skin type.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {currentProducts.map(({ node }) => (
                  <div key={node.handle} className="rounded-lg">
                    {node.media.edges[0]?.node.image?.src && (
                      <Link href={`/shop/${node.handle}`}>
                        <div className="border-hokBlack/20 relative aspect-3/2 w-full overflow-hidden rounded-xl border">
                          <Image
                            src={node.media.edges[0].node.image.src}
                            alt={node.media.edges[0].node.alt || node.title}
                            fill

                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                      </Link>
                    )}
                    <div className="mt-4 flex items-start justify-between">
                      <div className="max-w-[60%]">
                        <h4 className="font-montserrat mb-1 text-lg font-medium">
                          {node.title}
                        </h4>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`h-4 w-4 ${star <= 4 ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="font-montserrat text-base font-semibold">
                        {formatPrice(node.priceRange.minVariantPrice.amount, {
                          currencyCode:
                            node.priceRange.minVariantPrice.currencyCode,
                        })}
                      </p>
                    </div>
                  </div>
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
                      className={`flex h-10 w-10 items-center justify-center rounded border ${
                        currentPage === pageNumber
                          ? "border-[#73512C] bg-[#73512C] text-white"
                          : "border-gray-300 hover:bg-gray-50"
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
                    className="h-10 w-10"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <div className="mt-8">
        <Button
          variant="ghost"
          onClick={resetQuiz}
          className="text-burntOrange flex items-center font-medium"
        >
          <ArrowLeft />
          BACK TO QUIZ
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;
