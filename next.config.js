const fs = require('fs')
const path = require('path')
const withTypescript = require('@zeit/next-typescript')
const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const webpack = require('webpack')

// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')


// Where your theme.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/themes.less'), 'utf8')
)

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {}
}

/**
 * next的配置文件，支持配置嵌套
 */
module.exports = withTypescript(
  withLess({
    distDir: 'dist',
    generateEtags: false,
    generateBuildId: async () => {
      return 'build-' + process.env.NEXT_ENV + '-' + Date.now();
    },
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables // make your antd custom effective
    },
    webpack (config, options) {
      // if (options.isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin())
      if (options.isServer) {
        const antStyles = /antd\/.*?\/style.*?/
        const origExternals = [...config.externals]
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback()
            if (typeof origExternals[0] === 'function') {
              origExternals[0](context, request, callback)
            } else {
              callback()
            }
          },
          ...(typeof origExternals[0] === 'function' ? [] : origExternals),
        ]

        config.module.rules.unshift({
          test: antStyles,
          use: 'null-loader',
        })
      }
      return config
    },
  })
)
