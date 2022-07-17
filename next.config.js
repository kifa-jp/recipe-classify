const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const config = {
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  images: {
    domains: ['images.unsplash.com', 'image.space.rakuten.co.jp'],
  },
};

module.exports = withPWA(config);
