const webpack = require("webpack")
const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const deepExtend = require("deep-extend")
const {gitDescribeSync} = require("git-describe")
const os = require("os")

var pkg = require("./package.json")

let gitInfo

try {
  gitInfo = gitDescribeSync(__dirname)
} catch(e) {
  gitInfo = {
    hash: "noGit",
    dirty: false
  }
}
// temporarily suppress babel plugin warning
process.noDeprecation = true

var specialOptions = deepExtend({}, {
  hot: false,
  separateStylesheets: true,
  minimize: false,
  longTermCaching: false,
  sourcemaps: false,
})

module.exports = {
  entry: {
    app: [
      "./src/portlet/index.js",
      "./src/style/main.scss",
      "./src/polyfills",
      "./src/core/index.js",
      "./src/standalone/index.js"  
    ]
  },
  output: {
    filename:  "[name].js",
    path:      path.join(__dirname,"src","main", "resources", "META-INF", "resources", "lib"),
    devtoolModuleFilenameTemplate: "[resource-path]",
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].css" + (specialOptions.longTermCaching ? "?[contenthash]" : ""),
      allChunks: true
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV:  specialOptions.minimize ? JSON.stringify("production") : null,
        WEBPACK_INLINE_STYLES: !specialOptions.separateStylesheets
      },
      "buildInfo": JSON.stringify({
        PACKAGE_VERSION: (pkg.version),
        GIT_COMMIT: gitInfo.hash,
        GIT_DIRTY: gitInfo.dirty,
        HOSTNAME: os.hostname(),
        BUILD_TIME: new Date().toUTCString()
      })
    }),
    new webpack.DllReferencePlugin({
      context: ".",
      manifest: require(path.join(__dirname,"react_runtime","react_runtime-manifest.json"))
    }),
  ],
  module: {
    loaders: [
      { test: /\.(js(x)?)(\?.*)?$/,
        use: [{
          loader: "babel-loader",
          options: {
            retainLines: true
          }
        }],
        include: [ path.join(__dirname, "src") ]
      },
      { test: /\.(worker\.js)(\?.*)?$/,
        use: [
          {
            loader: "worker-loader",
            options: {
              inline: true,
              name: "[name].js"
            }
          },
          { loader: "babel-loader?retainLines=true" }
        ]
      },
      { test: /\.(txt|yaml)(\?.*)?$/,
        loader: "raw-loader" },
      { test: /\.(png|jpg|jpeg|gif|svg)(\?.*)?$/,
        loader: "url-loader?limit=10000" },
      { test: /\.(woff|woff2)(\?.*)?$/,
        loader: "url-loader?limit=100000" },
      { test: /\.(ttf|eot)(\?.*)?$/,
        loader: "file-loader" },
      { 
        test: /\.(css)(\?.*)?$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            "postcss-loader"
          ]
        })
      },
      { test: /\.(scss)(\?.*)?$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: { minimize: true }
            },
            {
              loader: "postcss-loader",
              options: { sourceMap: true }
            },
            { loader: "sass-loader",
              options: {
                outputStyle: "expanded",
                sourceMap: true,
                sourceMapContents: "true"
              }
            }
          ]
        })
      }    
    ],
  },
  resolveLoader: {
    modules: [path.join(__dirname, "node_modules")],
  },

  externals: {
    "buffertools": true // json-react-schema/deeper depends on buffertools, which fails.
  },

  resolve: {
    modules: [
      path.join(__dirname, "./src"),
      "node_modules"
    ],
    extensions: [".web.js", ".js", ".jsx", ".json", ".less"],
    alias: {
      base: "getbase/src/less/base",
    }
  },

  devtool: "source-map",
}