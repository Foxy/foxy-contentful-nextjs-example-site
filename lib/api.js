import axios from "axios";

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

async function fetchGraphQL(query, preview = false) {
  try {
    const res = await axios.post(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            preview
              ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
              : process.env.CONTENTFUL_ACCESS_TOKEN
          }`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(res.errors);
  }
}

function extractProduct(fetchResponse) {
  return fetchResponse?.data?.productCollection?.items?.[0];
}

function extractProductEntries(fetchResponse) {
  return fetchResponse?.data?.productCollection?.items;
}

export async function getFeaturedProducts(preview) {
  const entries = await fetchGraphQL(
    `query {
      productCollection(where: { featured: true }) {
        items {
          ${PRODUCT_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );

  return extractProductEntries(entries);
}
