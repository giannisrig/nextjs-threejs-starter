// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

