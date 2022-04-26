/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ADDRESS: process.env.FACTORY_CONTRACT,
    API : process.env.API,
    PRIVATE_KEY : process.env.PRIVATE_KEY,
    SHOP_PRODUCTS_CONTRACT : process.env.SHOP_PRODUCTS_CONTRACT
  },
}

module.exports = nextConfig
