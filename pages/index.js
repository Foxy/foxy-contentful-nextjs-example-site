import Link from "next/link";
import Image from "next/image";

import { getFeaturedProducts } from "../lib/api";
import Layout from "../components/layout";

export default function Home({ featuredProducts }) {
  return (
    <Layout>
      <div className="px-16 py-10 md:px-24 lg:px-28">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredProducts.map((product) => (
            <div
              key={product.slug}
              className="rounded bg-white border-gray-200 shadow-md hover:shadow-lg flex justify-center flex-col px-2 pt-3 pb-5"
            >
              <Image
                src={product.image.url}
                layout="intrinsic"
                width={550}
                height={370}
              />
              <h1 className="mt-4 text-xl">{product.name}</h1>
              <div className="mt-4">
                <a
                  href={`https://${process.env.NEXT_PUBLIC_FOXY_SUBDOMAIN}.foxycart.com/cart?name=${product.name}&price=${product.price}&image=${product.image.url}&cart=checkout`}
                  className="bg-gray-600 rounded px-3 py-2 text-gray-100 cursor-pointer"
                >
                  Buy Now
                </a>
                <Link
                  as={`/products/${product.slug}`}
                  href="/products/[slug]"
                  passHref
                >
                  <a className="ml-3 border border-gray-400 rounded px-3 py-2 text-gray-600 cursor-pointer">
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
  const featuredProducts = await getFeaturedProducts();

  return {
    props: { featuredProducts },
  };
};
