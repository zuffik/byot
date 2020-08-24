module.exports = {
  presets: [
    "@babel/preset-typescript",
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ]
  ],
  plugins: [
    "@babel/plugin-proposal-optional-chaining",
    "transform-require-context"
  ]
}
