module.exports = function (api) {
  api.cache(true);
  process.env.EXPO_ROUTER_APP_ROOT = "../../apps/expo/src/app";
  return {
    plugins: [
      "nativewind/babel",
      require.resolve("expo-router/babel"),
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
    ],
    presets: ["babel-preset-expo"],
  };
};
