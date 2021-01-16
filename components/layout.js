import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <nav className="flex items-center h-16 bg-gray-600 text-gray-100 tracking-widest">
        <h1 className="flex-grow ml-5 text-2xl font-semibold">Foxy Store</h1>

        <Link href="/">
          <a className="mr-5 text-xl font-medium hover:underline">Home</a>
        </Link>

        <a
          href="https://lrnxie-store.foxycart.com/cart?cart=view"
          className="mr-5 text-xl font-medium hover:underline cursor-pointer"
        >
          Cart
        </a>
      </nav>

      <main>{children}</main>
    </>
  );
}
