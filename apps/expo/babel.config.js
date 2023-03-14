module.exports = function (api) {
  api.cache(true);
  process.env.EXPO_ROUTER_APP_ROOT = "../../apps/expo/src/app";
  return {
    plugins: ["nativewind/babel", require.resolve("expo-router/babel")],
    presets: ["babel-preset-expo"],
  };
};
