import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { getAllProductsWithSlug, getProductBySlug } from "../../lib/api";
import Layout from "../../components/layout";

export default function Product({ product }) {
  return (
    <Layout>
      <div className="px-16 py-10 md:px-24 lg:px-28">
        <form
          action={`https://${process.env.NEXT_PUBLIC_FOXY_SUBDOMAIN}.foxycart.com/cart`}
          method="POST"
        >
          <input type="hidden" name="name" value={product.name} />
          <input type="hidden" name="price" value={product.price} />
          <input type="hidden" name="quantity_max" value={product.inventory} />
          <input type="hidden" name="image" value={product.image.url} />

          <div className="mt-8 grid lg:grid-cols-2">
            <div>
              <Image
                src={product.image.url}
                layout="responsive"
                width={550}
                height={350}
              />
            </div>

            <div className="py-5 lg:px-10 lg:py-3">
              <h1 className="text-3xl">{product.name}</h1>
              <h2 className="text-2xl">${product.price}</h2>
              <div className="my-2 mx-1">
                {documentToReactComponents(product.description.json)}
              </div>

              <input
                type="number"
                min="1"
                step="1"
                name="quantity"
                placeholder="Quantity"
                className="mt-5 mb-3 border border-gray-400 rounded p-2 block"
              />

              <button
                type="submit"
                className="bg-gray-600 rounded p-2 text-gray-100 cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getProductBySlug(params.slug, preview);

  return {
    props: {
      preview,
      product: data?.product ?? null,
    },
  };
}

export async function getStaticPaths() {
  const allProducts = await getAllProductsWithSlug();

  return {
    paths: allProducts?.map(({ slug }) => `/products/${slug}`) ?? [],
    fallback: true,
  };
}
