/**
 * webpack Configuration
 *
 * Working of a webpack can be very simple or complex. This is an internally simple
 * build configuration.
 *
 * webpack basics — If you are new the webpack here's all you need to know:
 *     1. webpack is a module bundler. It bundles different JS modules together.
 *     2. It needs and entry point and an output to process file(s) and bundle them.
 *     3. By default it only understands common JavaScript but you can make it
 *        understand other formats by way of adding a webpack loader.
 *     4. In the file below you will find an entry point, an output, and a babel-loader
 *        that tests all .js files excluding the ones in node_modules to process the
 *        ESNext and make it compatible with older browsers i.e. it converts the
 *        ESNext (new standards of JavaScript) into old JavaScript through a loader
 *        by Babel.
 *
 * @since 1.0.0
 */

const fs = require('fs');
const path = require('path');

// Make sure any symlinks in the project folder are resolved:
const pluginDir = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(pluginDir, relativePath);

// Export configuration.
module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        'main.min': './src/index.js' // 'name' : 'path/file.ext'.
    },
    output: {
        pathinfo: true,
        path: resolvePath('./dist/'), // The dist folder.
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: [require.resolve('babel-preset-cgb')],

                        // This is a feature of `babel-loader` for webpack (not Babel itself).
                        // It enables caching results in ./node_modules/.cache/babel-loader/
                        // directory for faster rebuilds.
                        cacheDirectory: true
                    }
                }
            }
        ]
    },

    // Add externals.
    externals: {
        wpObj: 'wpObj',
        gtag: 'gtag',
        Intercom: 'Intercom',
        jquery: 'jQuery', // import $ from 'jquery';
        Paddle: 'Paddle'
    }
};
