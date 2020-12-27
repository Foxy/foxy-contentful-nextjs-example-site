import { getFeaturedProducts } from "../lib/api";

export default function Home({ featuredProducts }) {
  return (
    <div className="container p-2">
      {featuredProducts.map((product) => (
        <a
          key={product.slug}
          className="text-blue-500 block"
          href={`https://${process.env.NEXT_PUBLIC_FOXY_SUBDOMAIN}.foxycart.com/cart?name=${product.name}&price=${product.price}`}
        >
          {product.name} - ${product.price}
        </a>
      ))}
    </div>
  );
}

export const getStaticProps = async () => {
  const featuredProducts = await getFeaturedProducts();

  return {
    props: { featuredProducts },
  };
};
