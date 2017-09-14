import { resolve } from "path"
import convertPathsToAliases, { TsconfigFile } from "./index"

it("it converts single file", () => {
  const tsConfig = getTsConfig({
    baseUrl: "./src",
    paths: {
      Utils: ["utils.tsx"]
    }
  })
  const expected = {
    Utils: resolve("src", "utils.tsx")
  }
  const result = convertPathsToAliases(tsConfig)

  expect(result).toEqual(expected)
})

it("it converts directory", () => {
  const tsConfig = getTsConfig({
    baseUrl: ".",
    paths: {
      "Actions/*": ["actions/*"]
    }
  })
  const expected = {
    Actions: resolve("actions")
  }
  expect(convertPathsToAliases(tsConfig)).toEqual(expected)
})

it("it converts multiple paths", () => {
  const tsConfig = getTsConfig({
    baseUrl: ".",
    paths: {
      "Actions/*": ["actions/*"],
      Utils: ["utils.tsx"]
    }
  })
  const expected = {
    Actions: resolve("actions"),
    Utils: resolve("utils.tsx")
  }
  expect(convertPathsToAliases(tsConfig)).toEqual(expected)
})

it("it works with optional param dirname", () => {
  const tsConfig = getTsConfig({
    baseUrl: "src",
    paths: {
      "Helpers/*": ["../helpers/*"]
    }
  })
  const dirname = resolve(__dirname, "general")
  const expected = {
    Helpers: resolve(__dirname, "general", "helpers")
  }
  expect(convertPathsToAliases(tsConfig, dirname)).toEqual(expected)
})

function getTsConfig(
  compilerOptions: TsconfigFile["compilerOptions"]
): TsconfigFile {
  return {
    compilerOptions
  }
}
