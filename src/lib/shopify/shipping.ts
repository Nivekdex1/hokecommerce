// src/lib/shopify/shipping.ts

export interface ShippingRateOption {
  id: string;
  title: string;
  description?: string;
  amount: number;
  currencyCode: string;
}

let cachedProfiles: any[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000; // Cache delivery profiles in memory for 5 minutes

async function fetchDeliveryProfiles(): Promise<any[]> {
  const now = Date.now();
  if (cachedProfiles && now - cacheTimestamp < CACHE_TTL) {
    return cachedProfiles;
  }

  const domain =
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ||
    process.env.SHOPIFY_STORE_DOMAIN ||
    "homeofkoreanbeauty.myshopify.com";

  const accessToken =
    process.env.SHOPIFY_ADMIN_ACCESS_TOKEN ||
    process.env.SHOPIFY_CUSTOM_APP_ADMIN_API_ACCESS_TOKEN;

  if (!accessToken) {
    console.warn(
      "[Shopify Shipping] No SHOPIFY_ADMIN_ACCESS_TOKEN found. Using local fallbacks."
    );
    return [];
  }

  const query = `{
    deliveryProfiles(first: 5) {
      edges {
        node {
          id
          name
          default
          profileLocationGroups {
            locationGroupZones(first: 20) {
              edges {
                node {
                  zone {
                    id
                    name
                    countries {
                      code {
                        countryCode
                      }
                      provinces {
                        code
                        name
                      }
                    }
                  }
                  methodDefinitions(first: 20) {
                    edges {
                      node {
                        id
                        name
                        description
                        active
                        rateProvider {
                          __typename
                          ... on DeliveryRateDefinition {
                            id
                            price {
                              amount
                              currencyCode
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
        }
      }
    }
  }`;

  const res = await fetch(`https://${domain}/admin/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    throw new Error(
      `Shopify delivery profiles fetch failed: ${res.status} ${res.statusText}`
    );
  }

  const data = await res.json();
  if (data.errors) {
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(data.errors)}`);
  }

  cachedProfiles = data.data?.deliveryProfiles?.edges || [];
  cacheTimestamp = now;
  return cachedProfiles || [];
}

function normalizeState(state?: string): string {
  if (!state) return "";
  const s = state.trim().toLowerCase();
  if (s.includes("abuja") || s === "fc" || s.includes("fct")) {
    return "abuja";
  }
  return s;
}

function provinceMatches(shopifyProvince: { name: string; code: string }, stateInput: string): boolean {
  const normInput = normalizeState(stateInput);
  const normName = normalizeState(shopifyProvince.name);
  const normCode = normalizeState(shopifyProvince.code);

  if (normInput === normName || normInput === normCode) return true;
  if (normName.includes(normInput) || normInput.includes(normName)) return true;
  return false;
}

export async function getShippingRatesForAddress(params: {
  country?: string;
  state?: string;
}): Promise<ShippingRateOption[]> {
  const { country = "Nigeria", state = "" } = params;

  if (!state.trim()) {
    return [];
  }

  try {
    const profiles = await fetchDeliveryProfiles();
    const defaultProfile =
      profiles.find((p) => p.node.default) || profiles[0];

    if (defaultProfile) {
      const normCountry = country.trim().toLowerCase();
      const isNigeria = normCountry === "nigeria" || normCountry === "ng";

      let matchedZone: any = null;
      let countryFallbackZone: any = null;

      for (const group of defaultProfile.node.profileLocationGroups || []) {
        for (const zoneEdge of group.locationGroupZones?.edges || []) {
          const zone = zoneEdge.node.zone;
          for (const c of zone.countries || []) {
            const cCode = c.code?.countryCode?.toUpperCase();
            const matchCountry = isNigeria ? cCode === "NG" : true;

            if (matchCountry) {
              if (c.provinces && c.provinces.length > 0) {
                const hasMatchingProvince = c.provinces.some((p: any) =>
                  provinceMatches(p, state)
                );
                if (hasMatchingProvince) {
                  matchedZone = zoneEdge.node;
                  break;
                }
              } else {
                countryFallbackZone = zoneEdge.node;
              }
            }
          }
          if (matchedZone) break;
        }
        if (matchedZone) break;
      }

      const targetZone = matchedZone || countryFallbackZone;
      const rates: ShippingRateOption[] = [];

      if (targetZone && targetZone.methodDefinitions) {
        for (const mEdge of targetZone.methodDefinitions.edges || []) {
          const m = mEdge.node;
          if (m.active !== false) {
            let amount = 0;
            let currencyCode = "NGN";
            if (
              m.rateProvider?.__typename === "DeliveryRateDefinition" &&
              m.rateProvider.price
            ) {
              amount = parseFloat(m.rateProvider.price.amount) || 0;
              currencyCode = m.rateProvider.price.currencyCode || "NGN";
            }
            rates.push({
              id: m.id,
              title: m.name,
              description: m.description || "",
              amount,
              currencyCode,
            });
          }
        }
      }

      if (rates.length > 0) {
        return rates;
      }
    }
  } catch (err) {
    console.warn(
      "[Shopify Shipping] Error querying delivery profiles, using fallback:",
      err
    );
  }

  // Resilient fallback based on store's active rates if API query encounters any issue
  const isLagos = normalizeState(state) === "lagos";
  if (isLagos) {
    return [
      {
        id: "fallback-lagos",
        title: "Delivery within Lagos",
        description: "",
        amount: 5000,
        currencyCode: "NGN",
      },
    ];
  } else {
    return [
      {
        id: "fallback-outside-lagos",
        title: "Delivery Outside Lagos (Other States)",
        description:
          "For orders outside Lagos, we offer flexible delivery options for your location. Once your order is placed, our team will reach out via DM or WhatsApp to confirm the most convenient courier service and delivery cost for your area.",
        amount: 6000,
        currencyCode: "NGN",
      },
    ];
  }
}

