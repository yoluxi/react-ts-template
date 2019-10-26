module.exports = function(api) {
  api.cache(true);
  const presets = ["@babel/env", "@babel/preset-typescript", "@babel/react"];
  const plugins = [
    [
      "import",
      {
        libraryName: "antd",
        libraryDirectory: "lib",
        style: true
      }
    ],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["@babel/plugin-syntax-dynamic-import"]
  ];

  return {
    presets,
    plugins
  };
};
