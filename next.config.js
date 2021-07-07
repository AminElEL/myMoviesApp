const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@use 'variables' as *;`,
  },
  webpack: (config) => {
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === 'object')
      .oneOf.filter((rule) => Array.isArray(rule.use))

    rules.forEach((rule) => {
      rule.use.forEach((moduleLoader) => {
        if (
          moduleLoader.loader.includes('css-loader') &&
          typeof moduleLoader.options.modules === 'object'
        ) {
          moduleLoader.options = {
            ...moduleLoader.options,
            modules: {
              ...moduleLoader.options.modules,
              exportLocalsConvention: 'camelCase',
            },
          }
        }
      })
    })

    return config
  },
  images: {
    domains: ['www.themoviedb.org'],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    API_KEY: process.env.API_KEY,
    IMG_URL: process.env.IMG_URL,
  },
}
