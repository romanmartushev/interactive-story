/**
 * As our first step, we'll pull in the user's webpack.mix.js
 * file. Based on what the user requests in that file,
 * a generic config object will be constructed for us.
 */
let mix = require('./public_html/js/index');

let ComponentFactory = require('./node_modules/laravel-mix/src/components/ComponentFactory');

new ComponentFactory().installAll();

require(Mix.paths.mix());

/**
 * Just in case the user needs to hook into this point
 * in the build process, we'll make an announcement.
 */

Mix.dispatch('init', Mix);

/**
 * Now that we know which build tasks are required by the
 * user, we can dynamically create a configuration object
 * for Webpack. And that's all there is to it. Simple!
 */

let WebpackConfig = require('./node_modules/laravel-mix/src/builder/WebpackConfig');
new WebpackConfig().build();

const Dotenv = require('dotenv-webpack');
module.exports = {
    entry: ['./resources/js/main.js','./resources/sass/welcome.scss', './resources/sass/tic-tac-toe.scss','./resources/sass/app.scss'],
    output: {
        filename: "./public_html/js/main.js"
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './public_html/css/[name].css',
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader?-url'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new Dotenv({
            path: './.env', // load this now instead of the ones in '.env'
            silent: true // hide any errors
        })
    ]
};
