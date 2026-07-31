// Shopify API response types
export type ShopifyRequestOptions = {
  query: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables?: any;
};

export type ShopifyProductsResponse = {
  data?: {
    products: {
      pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string;
        endCursor: string;
      };
      edges: Array<{
        node: {
          id: string;
          title: string;
          handle: string;
          description: string;
          priceRange: {
            minVariantPrice: {
              amount: string;
              currencyCode: string;
            };
          };
          images: {
            edges: Array<{
              node: {
                url: string;
                altText: string | null;
                width?: number;
                height?: number;
              };
            }>;
          };
        };
      }>;
    };
  };
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: string[];
    extensions?: Record<string, unknown>;
  }>;
};

export type ShopifyProductResponse = {
  data: {
    product: {
      id: string;
      title: string;
      handle: string;
      description: string;
      descriptionHtml: string;
      vendor: string;
      productType: string;
      tags: string[];
      availableForSale: boolean;
      totalInventory: number;
      collections: {
        edges: Array<{
          node: {
            id: string;
            title: string;
            handle: string;
          };
        }>;
      };
      priceRange: {
        minVariantPrice: {
          amount: string;
          currencyCode: string;
        };
      };
      images: {
        edges: Array<{
          node: {
            url: string;
            altText: string | null;
            width: number;
            height: number;
          };
        }>;
      };
      variants: {
        edges: Array<{
          node: {
            id: string;
            title: string;
            availableForSale: boolean;
            quantityAvailable: number;
            price: {
              amount: string;
              currencyCode: string;
            };
          };
        }>;
      };
    };
  };
};

export type ShopifyCollectionsResponse = {
  data: {
    collections: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          handle: string;
          description: string;
          image: {
            url: string;
            altText: string | null;
          } | null;
        };
      }>;
    };
  };
};

export type ShopifyMetaobjectResponse = {
  data: {
    metaobject: {
      id: string;
      handle: string;
      type: string;
      fields: Array<{
        key: string;
        value: string | null;
        reference: {
          image?: {
            url: string;
            altText: string | null;
          };
        } | null;
      }>;
    } | null;
  };
};

// Simplified types for use in components
export type Products = {
  id: string;
  title: string;
  handle: string;
  description: string;
  price: string;
  currencyCode: string;
  featuredImage?: {
    url: string;
    altText: string | null;
    width?: number;
    height?: number;
  };
};

export type ProductDetails = Products & {
  descriptionHtml: string;
  images: Array<{
    url: string;
    altText: string | null;
    width: number;
    height: number;
  }>;
  variants: Array<{
    id: string;
    title: string;
    availableForSale: boolean;
    price: {
      amount: string;
      currencyCode: string;
    };
  }>;
};

export type Collection = {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: {
    url: string;
    altText: string | null;
  } | null;
};

export type FilterParams = {
  minPrice?: string;
  maxPrice?: string;
  collections?: string[];
  vendors?: string[];
  productType?: string[];
  tags?: string[];
  category?: string[];
  sort?: string;
  view?: "grid" | "list";
};

export type CartItem = {
  id: string;
  productId: string;
  variantId: string | null;
  title: string;
  price: string;
  currencyCode: string;
  quantity: number;
  image: string;
  handle: string;
};

export type MetaobjectData = {
  id: string;
  handle: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: Record<string, any>;
};
