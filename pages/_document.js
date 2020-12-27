import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />

          {/* FOXYCART */}
          <script
            data-cfasync="false"
            src={`https://cdn.foxycart.com/${process.env.NEXT_PUBLIC_FOXY_SUBDOMAIN}/loader.js`}
            async
            defer
          ></script>
        </body>
      </Html>
    );
  }
}
