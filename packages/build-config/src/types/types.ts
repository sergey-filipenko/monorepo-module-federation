export interface BuildPaths {
  entry: string;
  html: string;
  output: string;
  src: string;
  public: string;
}
export type BuildMode = 'development' | 'production';

export type BuildPlatform = 'mobile' | 'desktop';

export interface BuildOptions {
  paths: BuildPaths;
  mode?: BuildMode;
  platform: BuildPlatform;
  analyzer?: boolean;
  isDev: boolean;
  isProd: boolean;
  port: number;
}
