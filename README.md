# Convert `tsconfig` paths to `webpack` aliases
Utility package to convert typescript paths notation to webpack aliases.

## Description
Typescript uses globstar in `paths` compiler option that is incompatible with webpack `alias` property.
This utility function converts `paths` found in `tsconfig.json` file to notation which webpack understands. In this way `typescript` and `webpack` aliases are always in sync and there is only one source of truth when it comes to aliases.

## Usage

in your `webpack.config`
```javascript
const convertPathsToAliases = require("convert-tsconfig-paths-to-webpack-aliases").default
const tsconfig = require("./tsconfig.json") // all comments in tsconfig.json must be removed
const aliases = convertPathsToAliases(tsconfig) 

module.exports = {
  ...
  resolve: {
    alias: aliases
  }
}
```