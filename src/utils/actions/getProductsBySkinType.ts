"use server";
import { shopifyFetch } from "@/lib/shopify";

interface ProductsBySkinType {
  data?: {
    collection: {
      title: string;
      products: {
        pageInfo: {
          hasNextPage: boolean;
          endCursor: string;
        };
        edges: Array<{
          cursor: string;
          node: {
            handle: string;
            title: string;
            availableForSale: boolean;
            priceRange: {
              minVariantPrice: {
                amount: string;
                currencyCode: string;
              };
            };
            media: {
              edges: Array<{
                node: {
                  mediaContentType: string;
                  alt: string | null;
                  image: {
                    src: string;
                  } | null;
                };
              }>;
            };
          };
        }>;
      };
    };
  };
}

interface ProductsBySkinTypeResponse {
  edges: Array<{
    node: {
      handle: string;
      title: string;
      availableForSale: boolean;
      priceRange: {
        minVariantPrice: {
          amount: string;
          currencyCode: string;
        };
      };
      media: {
        edges: Array<{
          node: {
            mediaContentType: string;
            alt: string | null;
            image: {
              src: string;
            } | null;
          };
        }>;
      };
    };
  }>;
}

export const getProductsBySkinType = async (
  handle: string,
): Promise<ProductsBySkinTypeResponse> => {
  let hasNextPage = true;
  let after: string | null = null;
  let allProducts: ProductsBySkinTypeResponse["edges"] = [];

  while (hasNextPage) {
    const query: string = `
      query ProductsBySkinType {
        collection(handle: "${handle}") {
          title
          products(first: 250${after ? `, after: "${after}"` : ""}) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              cursor
              node {
                handle
                title
                availableForSale
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                media(first: 2) {
                  edges {
                    node {
                      mediaContentType
                      alt
                      ... on MediaImage {
                        image {
                          src
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await shopifyFetch<ProductsBySkinType>({ query });
    const products = response.body.data?.collection.products;

    if (products) {
      allProducts = [...allProducts, ...products.edges];
      hasNextPage = products.pageInfo.hasNextPage;
      after = products.pageInfo.endCursor;
    } else {
      hasNextPage = false;
    }
  }

  return {
    edges: allProducts,
  };
};
