# A JAMstack e-commerce site using Next.js, Contentful and Foxy

Live demo: https://foxy-contentful-nextjs.vercel.app/

Step-by-step guide: [Build a JAMstack ecommerce website with Next.js, Contentful and Foxy](https://www.notion.so/Build-a-JAMstack-ecommerce-website-with-Next-js-Contentful-and-Foxy-756df98a4f0c4f5287812295ff6b5097)

## 🛠 Technologies used

- [Next.js](https://nextjs.org/) - Front-end framework
- [Contentful](https://www.contentful.com/) - Headless CMS
- [Foxy](https://foxy.io/) - Shopping cart
- [Vercel](https://vercel.com/) - Deployment
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [GraphQL](https://graphql.org/) - Query language for Contentful API

## 🚀 Quick start

### Set up Foxy

1. Sign up or log in your [Foxy](https://admin.foxycart.com/admin) admin account

2. Create a new store or use an existing one. Other settings are optional. The key thing is to have your own Foxy store subdomain.

### Set up Contentful

1. Sign up or log in [Contentful](https://be.contentful.com/login), and create a new empty **space** from the [dashboard](https://app.contentful.com/)

2. From the newly created space, go to **Content model** and add a new content type: give it the **Name** `Product`, the **Api Identifier** should be `product`

3. Add these fields and configure all as required fields:

   - `name` - **Text** field (type **short text**)
   - `slug` - **Text** field. You can optionally go to the settings of this field, and under **Appearance**, select **Slug** to display it as a slug of the `name` field.
   - `price` - **Number** field (type **Decimal**)
   - `image` - **Media** field (type **one file**)
   - `inventory` - **Number** field (type **Integer**)
   - `description` - **Rich text** field
   - `featured` - **Boolean** field

4. Head to the **Content** tab, add a few products and publish

### Get the required environment variables

From your Contentful space, go to **Settings > API keys**. There will be an example Content delivery / preview token - you can use these API keys or create a new key.

- `CONTENTFUL_SPACE_ID` should be the **Space ID** field of your API Key

- `CONTENTFUL_ACCESS_TOKEN` should be the **[Content Delivery API](https://www.contentful.com/developers/docs/references/content-delivery-api/) - access token** field of your API key

- `NEXT_PUBLIC_FOXY_SUBDOMAIN` should be the Foxy store subdomain, which can be found in the Foxy admin [Dashboard](https://admin.foxycart.com/admin.php). For exmaple, if your store domain is `foxy-demo.foxycart.com`, the subdomain would be `foxy-demo`

- `FOXY_STORE_SECRET` is required only if you want to enable [Foxy HMAC cart validation](https://wiki.foxycart.com/v/2.0/hmac_validation). To get this variable value, go to [Advanced Settings](https://admin.foxycart.com/admin.php?ThisAction=EditAdvancedFeatures) in the Foxy admin. Look for the "store secret" setting, click the "Show" button, and copy the value in the text box. Also, you need to check the "would you like to enable cart validation?" option in the same section

### Deploy to Vercel with one click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/lrnxie/foxy-contentful-nextjs.git&env=CONTENTFUL_SPACE_ID,CONTENTFUL_ACCESS_TOKEN,NEXT_PUBLIC_FOXY_SUBDOMAIN)

## 🏗 Want to get your hands dirty?

1. Clone this repo: `git clone https://github.com/lrnxie/foxy-contentful-nextjs`
2. Copy the `.env.example` file to `.env.local`, and set the [variables](#Get-the-required-environment-variables)
3. Make your changes
4. Push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/new).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.
