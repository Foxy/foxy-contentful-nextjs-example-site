import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <nav className="flex items-center h-16 bg-gray-600 text-gray-100 tracking-widest">
        <h1 className="flex-grow ml-5 text-2xl font-semibold">Foxy Store</h1>

        <Link href="/">
          <a className="mr-5 text-xl font-medium hover:underline">Home</a>
        </Link>

        <Link href="/products">
          <a className="mr-5 text-xl font-medium hover:underline">Products</a>
        </Link>

        <a
          href={`https://${process.env.NEXT_PUBLIC_FOXY_SUBDOMAIN}.foxycart.com/cart?cart=view`}
          className="mr-5 text-xl font-medium hover:underline cursor-pointer"
        >
          Cart (<span data-fc-id="minicart-quantity">0</span>)
        </a>
      </nav>

      <main>{children}</main>
    </>
  );
}
