// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    pluginOptions: {
        electronBuilder: {
            chainWebpackRendererProcess(config) {
                config.plugins.delete('workbox')
                config.plugins.delete('pwa')
            }
        }
    }
}
