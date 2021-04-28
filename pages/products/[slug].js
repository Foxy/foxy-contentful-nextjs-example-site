import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { getAllProducts, getProductBySlug } from "../../lib/api";
import { getFoxyForm } from "../../lib/foxy-signer";

export default function Product({ product, foxyForm }) {
  return (
    <div className="px-16 py-10 md:px-24 lg:px-28">
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
          <h2 className="text-2xl text-gray-600">${product.price}</h2>
          <div className="my-2 mx-1">
            {documentToReactComponents(product.description.json)}
          </div>

          <div dangerouslySetInnerHTML={{ __html: foxyForm }}></div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const data = await getProductBySlug(params.slug);

  return {
    props: {
      product: data?.product ?? null,
      foxyForm: getFoxyForm(data?.product),
    },
  };
}

export async function getStaticPaths() {
  const allProducts = await getAllProducts();

  return {
    paths: allProducts?.map(({ slug }) => `/products/${slug}`) ?? [],
    fallback: false,
  };
}
