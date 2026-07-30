"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/utils/formatPrice";
import {
  useFetchProduct,
  useFetchRelatedProducts,
} from "@/utils/hooks/useFetchProduct";
import {
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  CircleX,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function WholesaleProductPage() {
  const params = useParams();
  const router = useRouter();
  const productHandle = params.handle as string;
  const addItem = useCartStore((state) => state.addItem);

  // State for UI interactions
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [currentPrice, setCurrentPrice] = useState<string>("");
  const [currentCurrencyCode, setCurrentCurrencyCode] = useState<string>("");
  const [imageLoaded, setImageLoaded] = useState(false);

  // Fetch product data with React Query
  const { data: product, isLoading, error } = useFetchProduct(productHandle);

  // Fetch related products with React Query
  const { data: relatedProducts } = useFetchRelatedProducts(productHandle);

  // Derived state
  const [inStock, setInStock] = useState<boolean>(
    product?.variants[0].availableForSale || true,
  );

  // Initialize product data when it's loaded
  useEffect(() => {
    if (product) {
      setInStock(product.availableForSale);
      setCurrentPrice(product.price);
      setCurrentCurrencyCode(product.currencyCode);

      // If product has variants, select the first one by default
      if (product.variants && product.variants.length > 0) {
        setSelectedVariant(product.variants[0].id);
      }
    }
  }, [product]);

  // Handle errors
  useEffect(() => {
    if (error) {
      console.error("Error loading product:", error);
      router.push("/shop");
    }
  }, [error, router]);

  const handleVariantChange = (variantId: string) => {
    if (!product?.variants) return;

    const variant = product.variants.find(
      (v: { id: string; availableForSale: boolean }) => v.id === variantId,
    );
    if (!variant) return;

    setSelectedVariant(variantId);
    setInStock(variant.availableForSale);
    setCurrentPrice(variant.price.amount);
    setCurrentCurrencyCode(variant.price.currencyCode);

    // Reset quantity if the selected variant is out of stock
    if (!variant.availableForSale) {
      setQuantity(0);
    } else if (quantity === 0) {
      setQuantity(1);
    }

    // Limit quantity to available inventory if quantity info is available
    if (variant.quantityAvailable && quantity > variant.quantityAvailable) {
      setQuantity(variant.quantityAvailable);
    }
  };

  // Add to cart functionality
  const handleAddToBag = () => {
    addItem({
      productId: product.id,
      variantId: selectedVariant,
      title: product.title,
      price: currentPrice,
      currencyCode: currentCurrencyCode,
      quantity: quantity,
      image: product.images[0]?.url,
      handle: product.handle,
    });

    toast.success(`${quantity} × ${product.title} added to your shopping bag`);
  };

  const handleNextImage = () => {
    if (!product?.images?.length) return;
    setImageLoaded(false);
    setSelectedImage((prev) => (prev + 1) % (product.images?.length || 1));
  };

  const handlePrevImage = () => {
    if (!product?.images?.length) return;
    setImageLoaded(false);
    setSelectedImage(
      (prev) =>
        (prev - 1 + (product.images?.length || 1)) %
        (product.images?.length || 1),
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="mb-8 h-6 w-1/4 rounded bg-gray-200"></div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="aspect-square rounded-md bg-gray-200"></div>
            <div className="space-y-4">
              <div className="h-8 w-3/4 rounded bg-gray-200"></div>
              <div className="h-6 w-1/4 rounded bg-gray-200"></div>
              <div className="h-4 w-full rounded bg-gray-200"></div>
              <div className="h-4 w-full rounded bg-gray-200"></div>
              <div className="h-4 w-3/4 rounded bg-gray-200"></div>
              <div className="mt-8 h-10 w-1/2 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state (product not found)
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="mb-4 text-2xl font-bold">Product not found</h1>
        <p className="mb-6">
          The product you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Button asChild>
          <Link href="/wholesale-shop">Back to wholesale shop</Link>
        </Button>
      </div>
    );
  }

  // Get all images from the product
  const productImages =
    product.images && product.images.length > 0 ? product.images : [];

  // Get the formatted price
  const displayPrice = formatPrice(
    currentPrice || product.price,
    currentCurrencyCode
      ? { ...product, currencyCode: currentCurrencyCode }
      : product,
  );

  return (
    <div className="container mx-auto px-4 py-8 lg:px-16">
      <div className="mb-8">
        <Button
          variant="ghost"
          asChild
          className="hover:text-burntOrange p-0 hover:bg-transparent"
        >
          <Link href="/wholesale-shop" className="flex items-center">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to wholesale shop
          </Link>
        </Button>
      </div>

      <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-md bg-gray-100">
            <div className="relative">
              <Image
                src={productImages[selectedImage]?.url || "/placeholder.svg"}
                alt={productImages[selectedImage]?.altText || product.title}
                width={300}
                height={300}
                className={cn(
                  "h-full w-full object-cover transition-opacity duration-500",
                  imageLoaded ? "opacity-100" : "opacity-0",
                )}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-gray-900"></div>
                </div>
              )}
            </div>

            {productImages.length > 1 && (
              <>
                <button
                  className="absolute top-1/2 left-2 -translate-y-1/2 transform rounded-full bg-white/80 p-1 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  className="absolute top-1/2 right-2 -translate-y-1/2 transform rounded-full bg-white/80 p-1 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {productImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {productImages.map(
                (image: { url: string; altText: string }, index: number) => (
                  <button
                    key={index}
                    className={cn(
                      "relative h-20 w-20 overflow-hidden rounded-md border-2 transition-all duration-200",
                      selectedImage === index
                        ? "border-blue-600"
                        : "border-transparent hover:border-gray-300",
                    )}
                    onClick={() => {
                      setImageLoaded(false);
                      setSelectedImage(index);
                    }}
                  >
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={`${product.title} - Image ${index + 1}`}
                      fill

                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </button>
                ),
              )}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="animate-fadeIn">
          <div className="flex gap-2">
            <Badge
              variant="default"
              className="bg-burntOrange mb-4 rounded-3xl px-3 py-1 text-white"
            >
              {product.vendor}
            </Badge>
            <Badge
              variant="default"
              className="mb-4 rounded-3xl bg-neutral-700 px-3 py-1 text-white"
            >
              {product.productType}
            </Badge>
            <Badge
              variant="default"
              className="bg-burntOrange mb-4 rounded-3xl px-3 py-1 text-white"
            >
              Buy 5 get 5% off
            </Badge>
          </div>

          <h1 className="font-montserrat mb-2 text-3xl font-bold tracking-tight">
            {product.title}
          </h1>
          <p className="font-inter my-4 text-2xl font-bold">{displayPrice}</p>

          <div className="mb-8">
            <p className="font-montserrat max-w-xl text-lg text-neutral-600">
              {product.description}
            </p>
          </div>

          <div className="font-inter mb-6">
            {inStock ? (
              <div className="flex items-center gap-2">
                <CircleCheckBig className="h-5 w-5 text-green-700" />
                <p className="text-green-700 uppercase">In Stock</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CircleX className="h-5 w-5 text-red-600" />
                <p className="text-red-600">Out of Stock</p>
              </div>
            )}
          </div>

          <div className="mb-6 flex items-center gap-2 rounded-md border border-yellow-300 bg-yellow-100 p-2 ">
            <p className="font-montserrat text-base font-semibold">
              Buy 5 get 5% off at checkout
            </p>
          </div>

          {/* Variant Toggles */}
          {product.variants && product.variants.length > 1 && (
            <div className="mb-6">
              <h3 className="mb-3 font-medium">Variants</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map(
                  (variant: {
                    id: string;
                    availableForSale: boolean;
                    title: string;
                  }) => (
                    <Toggle
                      key={variant.id}
                      pressed={selectedVariant === variant.id}
                      onPressedChange={() => handleVariantChange(variant.id)}
                      variant="outline"
                      disabled={!variant.availableForSale}
                      className={cn(
                        "rounded-md transition-all duration-200",
                        selectedVariant === variant.id
                          ? "border-burntOrange text-burntOrange"
                          : "",
                        !variant.availableForSale && "line-through opacity-50",
                      )}
                    >
                      {variant.title}
                      {!variant.availableForSale && " (Out of Stock)"}
                    </Toggle>
                  ),
                )}
              </div>
            </div>
          )}

          {/* Add to Cart Section */}
          <div className="flex gap-2">
            <div className="w-14">
              <Input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="h-10 bg-white text-center"
                disabled={!inStock}
              />
            </div>
            <Button
              id="add-to-bag-button"
              size="lg"
              className="bg-burntOrange flex-1 cursor-pointer gap-2 text-white"
              onClick={handleAddToBag}
              disabled={!inStock || quantity < 1}
            >
              <ShoppingBag className="h-5 w-5" />
              Add to Bag
            </Button>
          </div>

          {/* Product Information Accordion */}
          <Accordion
            type="single"
            collapsible
            className="font-montserrat mt-8 space-y-2"
          >
            <AccordionItem value="description">
              <AccordionTrigger className="mb-2">
                Product Description
              </AccordionTrigger>
              <AccordionContent className="mt-3">
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.descriptionHtml || product.description,
                  }}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping">
              <AccordionTrigger className="mb-2">
                Shipping & Returns
              </AccordionTrigger>
              <AccordionContent className="mt-3">
                <p>
                  Delivery Outside Lagos (Other States) For orders outside
                  Lagos, we offer flexible delivery options for your location.
                  Once your order is placed, our team will reach out via DM or
                  WhatsApp to confirm the most convenient courier service and
                  delivery cost for your area.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Related Products */}
    </div>
  );
}
