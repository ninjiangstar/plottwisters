const path = require("path");
const WebpackNotifierPlugin = require("webpack-notifier");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const IS_PRODUCTION = process.env.NODE_ENV === "production";
const DEV_PORT = process.env.PORT || 9000;

module.exports = {
    mode: IS_PRODUCTION ? "production" : "development",
    devtool: IS_PRODUCTION ? false : "inline-source-map",

    entry: {
        twisterland: [
            "./src/index.tsx",
        ],
    },

    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./dist"),
    },

    devServer: {
        contentBase: "./src",
        index: path.resolve(__dirname, "src/index.html"),
        port: DEV_PORT,
        https: false,
        inline: true,
        overlay: {
            warnings: true,
            errors: true,
        },
        historyApiFallback: true,
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: require.resolve("ts-loader"),
            },
            {
                test: /\.scss$/,
                use: [
                    require.resolve("style-loader"),
                    require.resolve("css-loader"),
                    {
                        loader: require.resolve("postcss-loader"),
                        options: {
                            plugins: [
                                require("autoprefixer")
                            ],
                        },
                    },
                    require.resolve("sass-loader")
                ],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true },
                    },
                ],
            },
            {
                test: /\.ya?ml$/,
                use: 'js-yaml-loader',
            },
        ],
    },

    plugins: [
        new WebpackNotifierPlugin(),
        new CopyWebpackPlugin([
            // to: is relative to dist/
            { from: "src/index.html", to: "." },
        ])
    ],

    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
    },
}