import { resolve } from "path"

export interface TsconfigFile {
  compilerOptions: {
    baseUrl: string
    paths: {
      [aliasName: string]: string[]
    }
  }
}

type WebpackAliases = {
  [aliasName: string]: string
}

const replaceGlobs = (path: string): string =>
  path.replace(/(\/\*\*)*\/\*$/, "")

export default (tsconfigFile: TsconfigFile, dirname = "."): WebpackAliases => {
  const { baseUrl, paths } = tsconfigFile.compilerOptions
  return Object.keys(paths).reduce((aliases: WebpackAliases, pathName) => {
    const alias = replaceGlobs(pathName)
    const path = replaceGlobs(paths[pathName][0])
    aliases[alias] = resolve(dirname, baseUrl, path)
    return aliases
  }, {})
}
