import path from 'path'

export interface confsIn {
   prettier: string
   ts: string
}
export const confs: confsIn = {
   prettier: path.join(__dirname, '..', 'configs', '.prettierrc'),
   ts: path.join(__dirname, '..', 'configs', 'tsconfig.json'),
}

const fromPrettierBoilerplate = (
   printWidth,
   singleQuote,
   useTabs,
   trailingComma,
   tabWidth,
   semi,
   arrowParens
) => `{
   "printWidth": ${printWidth},
   "singleQuote": ${singleQuote},
   "useTabs": ${useTabs},
   "trailingComma":  ${trailingComma},
   "tabWidth": ${tabWidth},
   "semi": ${semi},
   "arrowParens": ${arrowParens}
}
`

const fromTsConfig = (ts_outDir, ts_target, ts_strict) => `{
   "compilerOptions": {
      "outDir": ${ts_outDir},
      "allowJs": true,
      "target": ${ts_target},
      "esModuleInterop": true,
      "experimentalDecorators": true,
      "emitDecoratorMetadata": true,
      "strict": ${ts_strict},
      "declaration": true
   },
   "include": ["./src/**/*", "./src/*"]
}`

const trueOrFalse = (yesOrNo: 'yes' | 'no') => (yesOrNo === 'yes' ? true : false)
const toString = (str: string) => `"${str}"`

export const genPrettier = (
   p_printWidth,
   p_singleQuote,
   p_useTabs,
   p_trailingComma,
   p_tabWidth,
   p_semi,
   p_arrowParens
) =>
   fromPrettierBoilerplate(
      p_printWidth,
      trueOrFalse(p_singleQuote),
      trueOrFalse(p_useTabs),
      toString(p_trailingComma),
      p_tabWidth,
      trueOrFalse(p_semi),
      toString(p_arrowParens)
   )

export const genTs = (ts_outDir, ts_target, ts_strict) =>
   fromTsConfig(toString(ts_outDir), toString(ts_target), trueOrFalse(ts_strict))
