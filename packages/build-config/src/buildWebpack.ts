import webpack from "webpack";
import {buildDevServer} from "./buildDevServer";
import {buildPlugins} from "./buildPlugins";
import {buildLoaders} from "./buildLoaders";
import {buildResolvers} from "./buildResolvers";
import {BuildOptions} from "./types/types";

export const buildWebpack = (options: BuildOptions): webpack.Configuration => {
  const {isDev, paths, } = options;
  return {
    mode: options.mode ?? 'development',
    entry: paths.entry,
    devtool: options.isDev ? 'inline-source-map' : false,
    module: {
      rules: buildLoaders(options)
    },
    output: {
      path: paths.output,
      filename: '[name].[contenthash].js',
      clean: true,
    },
    plugins: buildPlugins(options),
    resolve: buildResolvers(options),
    devServer: isDev
      ? buildDevServer(options)
      : undefined,
  }
}