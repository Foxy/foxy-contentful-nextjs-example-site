import { getFeaturedProducts } from "../lib/api";

export default function Home({ featuredProducts }) {
  return (
    <div className="container p-2">
      {featuredProducts.map((product) => (
        <p key={product.slug}>
          {product.name} - ${product.price}
        </p>
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
