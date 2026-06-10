const { SiteConfig } = require('./site-config.model');

const getSiteConfig = async () => {
  let config = await SiteConfig.findOne({ slug: 'main' });
  if (!config) {
    config = await SiteConfig.create({ slug: 'main' });
  }
  return config;
};

module.exports = { getSiteConfig };
