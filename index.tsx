import { resolve } from "path"

type TsconfigFile = {
  baseUrl: string
  paths: {
    [aliasName: string]: string[]
  }
}

type WebpackAliases = {
  [aliasName: string]: string
}

const replaceGlobs = (path: string): string =>
  path.replace(/(\/\*\*)*\/\*$/, "")

export default (tsconfigFile: TsconfigFile, dirname = "."): WebpackAliases => {
  const { baseUrl, paths } = tsconfigFile
  return Object.keys(paths).reduce((aliases: WebpackAliases, pathName) => {
    const alias = replaceGlobs(pathName)
    const path = replaceGlobs(paths[pathName][0])
    return {
      ...aliases,
      [alias]: resolve(dirname, baseUrl, path)
    }
  }, {})
}
