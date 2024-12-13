const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// Obtenha a configuração padrão
const config = getDefaultConfig(__dirname);

// Adicione a configuração para SVGs
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};
config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...config.resolver.sourceExts, "svg"],
};

// Integre o NativeWind
module.exports = withNativeWind(config, { input: "./src/styles/global.css" });