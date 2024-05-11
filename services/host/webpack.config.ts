import path from 'path';
import webpack from 'webpack';
import 'webpack-dev-server';
import {BuildMode, BuildPaths, BuildPlatform, buildWebpack} from "@packages/build-config";
import packageJson from './package.json';

interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  analyzer?: boolean;
  platform?: BuildPlatform;
  SHOP_REMOTE_URL?: string;
  ADMIN_REMOTE_URL?: string;
}
export default (env: EnvVariables): webpack.Configuration => {
  const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL || 'http://localhost:3001';
  const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL || 'http://localhost:3002';
  const isDev = env.mode !== 'production';
  const isProd = !isDev;
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    output: path.resolve(__dirname, 'build'),
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public'),
  };
  const config: webpack.Configuration = buildWebpack({
    mode: env.mode || 'development',
    platform: env.platform || 'desktop',
    port: env.port || 3000,
    analyzer: env.analyzer,
    isDev,
    isProd,
    paths,
  });
  config.plugins.push(new webpack.container.ModuleFederationPlugin({
    name: 'host',
    filename: 'remoteEntry.js',
    remotes: {
      shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
      admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
    },
    shared: {
      ...packageJson.dependencies,
      react: {
        eager: true,
        requiredVersion: packageJson.dependencies['react'],
      },
      'react-dom': {
        eager: true,
        requiredVersion: packageJson.dependencies['react-dom'],
      },
      'react-router-dom': {
        eager: true,
        requiredVersion: packageJson.dependencies['react-router-dom'],
      }
    }
  }));
  return config;
};
