import * as FoxySDK from "@foxy.io/sdk";

const signer = new FoxySDK.Backend.Signer(process.env.FOXY_STORE_SECRET);

export function getFoxyLink(product) {
  const link = `https://${process.env.NEXT_PUBLIC_FOXY_SUBDOMAIN}.foxycart.com/cart?name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image.url)}&code=${encodeURIComponent(product.slug)}&quantity_max=${product.inventory}&cart=checkout`;

  return process.env.FOXY_STORE_SECRET ? signer.signUrl(link) : link;
}

export function getFoxyForm(product) {
  const formHtml = `
    <form action="https://${process.env.NEXT_PUBLIC_FOXY_SUBDOMAIN}.foxycart.com/cart" method="POST">
      <input type="hidden" name="name" value="${product.name}" />
      <input type="hidden" name="price" value="${product.price}" />
      <input type="hidden" name="quantity_max" value="${product.inventory}" />
      <input type="hidden" name="image" value="${product.image.url}" />
      <input type="hidden" name="code" value="${product.slug}" />

      <input
        type="number"
        min="1"
        step="1"
        value=""
        name="quantity"
        placeholder="Quantity"
        class="mt-5 mb-3 border border-gray-400 rounded py-2 px-3 block"
      />

      <button
        type="submit"
        class="bg-gray-600 rounded py-2 px-6 text-gray-100 cursor-pointer"
      >
        Add to Cart
      </button>
    </form>
  `;

  return process.env.FOXY_STORE_SECRET ? signer.signHtml(formHtml) : formHtml;
}
