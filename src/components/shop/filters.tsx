"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { brands, categories, productTypes, skinConcerns } from "@/lib/filters";
import { useFetchAllCollections } from "@/utils/hooks/useFetchAllCollections";
import { Sliders } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {
    data: shopifyCollections,
    isLoading: isCollectionsLoading,
    error: collectionsError,
  } = useFetchAllCollections();

  useEffect(() => {
    const collectionParam = searchParams.get("collections");
    if (collectionParam && shopifyCollections) {
      console.log(`Collection filter active: ${collectionParam}`);
    }
  }, [searchParams, shopifyCollections]);

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      const params = new URLSearchParams(searchParams.toString());

      if (type === "checkbox") {
        const currentValues = params.getAll(name);
        if (checked) {
          if (name === "collections") {
            params.delete("collections");
            params.append("collections", value);
          } else if (!currentValues.includes(value)) {
            params.append(name, value);
          }
        } else {
          params.delete(name);
          currentValues
            .filter((val) => val !== value)
            .forEach((val) => params.append(name, val));
        }
      } else {
        if (value) {
          params.set(name, value);
        } else {
          params.delete(name);
        }
      }

      params.delete("page");

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  const handleClearFilters = useCallback(() => {
    const params = new URLSearchParams();
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router]);

  const isChecked = (name: string, value: string) => {
    const currentValues = searchParams.getAll(name);
    return currentValues.includes(value);
  };

  const getInputValue = (name: string) => {
    return searchParams.get(name) || "";
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Desktop Filters */}
      <div className="hidden max-w-lg md:block">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">Filters</h3>
        </div>

        <Accordion type="multiple" className="w-full space-y-4">
          {/* Price Range */}
          <AccordionItem value="price">
            <AccordionTrigger className="mb-2 border border-gray-300">
              Price Range
            </AccordionTrigger>
            <AccordionContent>
              <div className="ml-2 grid grid-cols-2 gap-6 px-2">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="min price"
                  className="mt-3 rounded-lg bg-white px-4 py-3 text-xs ring-1 ring-gray-400"
                  onChange={handleFilterChange}
                  value={getInputValue("minPrice")}
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="max price"
                  className="mt-3 rounded-lg bg-white px-4 py-3 text-xs ring-1 ring-gray-400"
                  onChange={handleFilterChange}
                  value={getInputValue("maxPrice")}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Collections */}
          <AccordionItem value="collections">
            <AccordionTrigger className="mb-2 border border-gray-300">
              Collections
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-4 ml-4 flex flex-wrap items-center gap-4">
                {isCollectionsLoading ? (
                  <div className="animate-pulse space-y-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="h-5 w-32 rounded bg-gray-200"
                      ></div>
                    ))}
                  </div>
                ) : collectionsError ? (
                  <div className="text-sm text-red-500">
                    Failed to load collections
                  </div>
                ) : (
                  shopifyCollections?.map((collection) => (
                    <div
                      key={collection.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        name="collections"
                        value={collection.handle}
                        id={`collection-${collection.handle}`}
                        onChange={handleFilterChange}
                        checked={isChecked("collections", collection.handle)}
                        className="accent-burntOrange h-4 w-4 bg-white"
                      />
                      <label
                        htmlFor={`collection-${collection.handle}`}
                        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {collection.title}
                      </label>
                    </div>
                  ))
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Brands */}
          <AccordionItem value="vendors">
            <AccordionTrigger className="mb-2 border border-gray-300">
              Brands
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-4 ml-4 flex flex-wrap items-center gap-4">
                {brands.map((brand) => (
                  <div key={brand.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="vendors"
                      value={brand.id}
                      id={`brand-${brand.id}`}
                      onChange={handleFilterChange}
                      checked={isChecked("vendors", brand.id)}
                      className="accent-burntOrange h-4 w-4 bg-white"
                    />
                    <label
                      htmlFor={`brand-${brand.id}`}
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {brand.name}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Product Types */}
          <AccordionItem value="productTypes">
            <AccordionTrigger className="mb-2 border border-gray-300">
              Product Types
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-4 ml-4 flex flex-wrap items-center gap-4">
                {productTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <input
                      id={`productType-${type.id}`}
                      onChange={handleFilterChange}
                      type="checkbox"
                      name="productType"
                      value={type.id}
                      checked={isChecked("productType", type.id)}
                      className="accent-burntOrange h-4 w-4 bg-white"
                    />
                    <label
                      htmlFor={`productType-${type.id}`}
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type.name}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Tags  */}
          <AccordionItem value="tags">
            <AccordionTrigger className="mb-2 border border-gray-300">
              Tags
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-4 ml-4 flex flex-wrap items-center gap-4">
                {skinConcerns.map((concern) => (
                  <div key={concern.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="tags"
                      value={concern.id}
                      id={`concern-${concern.id}`}
                      onChange={handleFilterChange}
                      checked={isChecked("tags", concern.id)}
                      className="accent-burntOrange h-4 w-4 bg-white"
                    />
                    <label
                      htmlFor={`concern-${concern.id}`}
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {concern.name}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Categories */}
          <AccordionItem value="categories">
            <AccordionTrigger className="mb-2 border border-gray-300">
              Categories
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-4 ml-4 flex flex-wrap items-center gap-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2"
                  >
                    <input
                      id={`category-${category.id}`}
                      onChange={handleFilterChange}
                      type="checkbox"
                      name="category"
                      value={category.id}
                      checked={isChecked("category", category.id)}
                      className="accent-burntOrange h-4 w-4 bg-white"
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <Button
            variant="outline"
            size="lg"
            className="bg-[#73512C] text-white mt-6 w-full"
            onClick={handleClearFilters}
          >
            Clear Filter
          </Button>
        </Accordion>
      </div>

      {/* Mobile Filter Trigger */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2">
              <Sliders className="h-5 w-5" />
              <span>Filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="pt-7">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>
                Refine your product search here
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4 px-4">
              <Accordion type="multiple" className="w-full space-y-4">
                {/* Price Range */}
                <AccordionItem value="price" className="border-0">
                  <AccordionTrigger className="mb-2 border border-gray-300">
                    Price Range
                  </AccordionTrigger>
                  <AccordionContent className="px-2">
                    <div className="ml-2 flex flex-col items-start gap-3">
                      <input
                        type="number"
                        name="minPrice"
                        placeholder="min price"
                        className="mt-3 w-full rounded-2xl bg-white px-4 py-3 text-xs ring-1 ring-gray-400"
                        onChange={handleFilterChange}
                        value={getInputValue("minPrice")}
                      />
                      <input
                        type="number"
                        name="maxPrice"
                        placeholder="max price"
                        className="mt-3 w-full rounded-2xl bg-white px-4 py-3 text-xs ring-1 ring-gray-400"
                        onChange={handleFilterChange}
                        value={getInputValue("maxPrice")}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                {/* Collections */}
                <AccordionItem value="collections" className="border-0">
                  <AccordionTrigger className="mb-2 border border-gray-300">
                    Collections
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-4 ml-4 flex flex-wrap items-center gap-4">
                      {isCollectionsLoading ? (
                        <div className="animate-pulse space-y-2">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className="h-5 w-32 rounded bg-gray-200"
                            ></div>
                          ))}
                        </div>
                      ) : collectionsError ? (
                        <div className="text-sm text-red-500">
                          Failed to load collections
                        </div>
                      ) : (
                        shopifyCollections?.map((collection) => (
                          <div
                            key={`mobile-collection-${collection.id}`}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              name="collections"
                              value={collection.handle}
                              id={`mobile-collection-${collection.handle}`}
                              onChange={handleFilterChange}
                              checked={isChecked(
                                "collections",
                                collection.handle,
                              )}
                              className="accent-burntOrange h-4 w-4 bg-white"
                            />
                            <label
                              htmlFor={`mobile-collection-${collection.handle}`}
                              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {collection.title}
                            </label>
                          </div>
                        ))
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                {/* Brands */}
                <AccordionItem value="vendors" className="border-0">
                  <AccordionTrigger className="mb-2 border border-gray-300">
                    Brands
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-4 ml-4 flex flex-wrap items-center gap-4">
                      {brands.map((brand) => (
                        <div
                          key={`mobile-brand-${brand.id}`}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            name="vendors"
                            value={brand.id}
                            id={`mobile-brand-${brand.id}`}
                            onChange={handleFilterChange}
                            checked={isChecked("vendors", brand.id)}
                            className="accent-burntOrange h-4 w-4 bg-white"
                          />
                          <label
                            htmlFor={`mobile-brand-${brand.id}`}
                            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {brand.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                {/* Product Types */}
                <AccordionItem value="productTypes" className="border-0">
                  <AccordionTrigger className="mb-2 border border-gray-300">
                    Product Types
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-4 ml-4 flex flex-wrap items-center gap-4">
                      {productTypes.map((type) => (
                        <div
                          key={`mobile-productType-${type.id}`}
                          className="flex items-center space-x-2"
                        >
                          <input
                            id={`mobile-productType-${type.id}`}
                            onChange={handleFilterChange}
                            type="checkbox"
                            name="productType"
                            value={type.id}
                            checked={isChecked("productType", type.id)}
                            className="accent-burntOrange h-4 w-4 bg-white"
                          />
                          <label
                            htmlFor={`mobile-productType-${type.id}`}
                            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {type.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                {/* Tags */}
                <AccordionItem value="tags" className="border-0">
                  <AccordionTrigger className="mb-2 border border-gray-300">
                    Tags
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-4 ml-4 flex flex-wrap items-center gap-4">
                      {skinConcerns.map((concern) => (
                        <div
                          key={`mobile-concern-${concern.id}`}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            name="tags"
                            value={concern.id}
                            id={`mobile-concern-${concern.id}`}
                            onChange={handleFilterChange}
                            checked={isChecked("tags", concern.id)}
                            className="accent-burntOrange h-4 w-4 bg-white"
                          />
                          <label
                            htmlFor={`mobile-concern-${concern.id}`}
                            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {concern.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                {/* Categories */}
                <AccordionItem value="categories" className="border-0">
                  <AccordionTrigger className="mb-2 border border-gray-300">
                    Categories
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-4 ml-4 flex flex-wrap items-center gap-4">
                      {categories.map((category) => (
                        <div
                          key={`mobile-category-${category.id}`}
                          className="flex items-center space-x-2"
                        >
                          <input
                            id={`mobile-category-${category.id}`}
                            onChange={handleFilterChange}
                            type="checkbox"
                            name="category"
                            value={category.id}
                            checked={isChecked("category", category.id)}
                            className="accent-burntOrange h-4 w-4 bg-white"
                          />
                          <label
                            htmlFor={`mobile-category-${category.id}`}
                            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Button
                variant="outline"
                size="lg"
                className="bg-[#73512C] text-white mt-6 w-full"
                onClick={handleClearFilters}
              >
                Clear All Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
