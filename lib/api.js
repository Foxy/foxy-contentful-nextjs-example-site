import axios from "axios";

// product fields to fetch
const PRODUCT_GRAPHQL_FIELDS = `
name
slug
price
image {
  url
}
inventory
description {
  json
}
`;

// connect Contentful
async function fetchGraphQL(query) {
  try {
    const res = await axios.post(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Failed to fetch Contentful");
  }
}

// helper functions for extracting product entries from response
function extractProduct(fetchResponse) {
  return fetchResponse?.data?.productCollection?.items?.[0];
}

function extractProductEntries(fetchResponse) {
  return fetchResponse?.data?.productCollection?.items;
}

// get products whose featured field is set to true
export async function getFeaturedProducts() {
  const entries = await fetchGraphQL(
    `query {
      productCollection(where: { featured: true }) {
        items {
          ${PRODUCT_GRAPHQL_FIELDS}
        }
      }
    }`
  );

  return extractProductEntries(entries);
}

// get all products
export async function getAllProducts() {
  const entries = await fetchGraphQL(
    `query {
      productCollection(where: { slug_exists: true }) {
        items {
          ${PRODUCT_GRAPHQL_FIELDS}
        }
      }
    }`
  );

  return extractProductEntries(entries);
}

// get a specific product by its slug
export async function getProductBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      productCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          ${PRODUCT_GRAPHQL_FIELDS}
        }
      }
    }`
  );

  return {
    product: extractProduct(entry),
  };
}
