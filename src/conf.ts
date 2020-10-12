import path from 'path'

export interface confsIn {
   prettier: string
   ts: string
}
export const confs: confsIn = {
   prettier: path.join(__dirname, '..', 'configs', '.prettierrc'),
   ts: path.join(__dirname, '..', 'configs', 'tsconfig.json'),
}

const fromBoilerplate = (
   printWidth: any,
   singleQuote: any,
   useTabs: any,
   trailingComma: any,
   tabWidth: any,
   semi: any,
   arrowParens: any
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
const trueOrFalse = (yesOrNo: 'yes' | 'no') => (yesOrNo === 'yes' ? true : false)
const toString = (str: string) => `"${str}"`
export const genPrettier = (
   p_printWidth: any,
   p_singleQuote: any,
   p_useTabs: any,
   p_trailingComma: any,
   p_tabWidth: any,
   p_semi: any,
   p_arrowParens: any
) => {
   const config = fromBoilerplate(
      p_printWidth,
      trueOrFalse(p_singleQuote),
      trueOrFalse(p_useTabs),
      toString(p_trailingComma),
      p_tabWidth,
      trueOrFalse(p_semi),
      toString(p_arrowParens)
   )
   return config
}
