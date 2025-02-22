import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import ReactRefreshTypeScript from 'react-refresh-typescript';
import {buildBabelLoader} from "./babel/buildBabelLoader";
export const buildLoaders = (options: BuildOptions): ModuleOptions['rules'] => {
  const {isDev} = options;
  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
      },
    },
  }
  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      cssLoaderWithModules,
      'sass-loader'
    ]
  }
  const tsLoader = {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
          transpileOnly: false
        }
      }
    ],
    exclude: /node_modules/,
  }

  const babelLoader = buildBabelLoader(options)

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  }
  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [ {
      loader: '@svgr/webpack',
      options: {
        icon: true,
      },

    }],
  }
  return [
    assetLoader,
    scssLoader,
    //tsLoader,
    babelLoader,
    svgLoader
  ]
}