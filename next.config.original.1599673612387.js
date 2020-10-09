const withTM = require('next-plugin-transpile-modules');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(
  withTM(
    withCSS(
      withSass(
        withImages({
          compress: true,
          poweredByHeader: false,
          target: 'serverless',
          devIndicators: {
            autoPrerender: false,
          },
          lessLoaderOptions: {
            javascriptEnabled: true,
          },
          webpack: (config, options) => {
            config.module.rules.push({
              test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]',
                  },
                },
              ],
            });
            return config;
          },
        })
      )
    )
  )
);
