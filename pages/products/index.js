import Link from "next/link";
import Image from "next/image";

import { getAllProductsWithSlug } from "../../lib/api";
import Layout from "../../components/layout";

export default function AllProducts({ allProducts }) {
  return (
    <Layout>
      <div className="px-16 py-10 md:px-24 lg:px-28">
        <h2 className="text-2xl mb-2">All Products</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {allProducts.map((product) => (
            <div
              key={product.slug}
              className="rounded bg-white border-gray-200 shadow-md hover:shadow-xl flex justify-center flex-col px-2 pt-3 pb-5"
            >
              <Image
                src={product.image.url}
                layout="intrinsic"
                width={550}
                height={370}
              />

              <div className="mt-4 flex items-baseline">
                <h1 className="ml-1 text-xl flex-1">{product.name}</h1>
                <h2 className="mr-2 text-lg text-gray-500">${product.price}</h2>
              </div>

              <div className="mt-4">
                <a
                  href={`https://${process.env.NEXT_PUBLIC_FOXY_SUBDOMAIN}.foxycart.com/cart?name=${product.name}&price=${product.price}&image=${product.image.url}&cart=checkout`}
                  className="ml-1 bg-gray-600 rounded px-4 py-2 text-gray-100 cursor-pointer"
                >
                  Buy Now
                </a>
                <Link
                  as={`/products/${product.slug}`}
                  href="/products/[slug]"
                  passHref
                >
                  <a className="ml-3 border border-gray-400 rounded px-4 py-2 text-gray-600 cursor-pointer">
                    Details
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const allProducts = await getAllProductsWithSlug();

  return {
    props: { allProducts },
  };
};
