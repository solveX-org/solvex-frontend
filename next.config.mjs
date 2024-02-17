/** @type {import('next').NextConfig} */
const nextConfig = {
    
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts|md)x?$/]
      },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;



// const path = require('path');

// module.exports = {
// };

