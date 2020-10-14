import inquirer from 'inquirer'

export const askPrettier = () =>
   new Promise(resolve => {
      inquirer
         .prompt([
            {
               name: 'p_printWidth',
               type: 'list',
               message: 'What print width would you like?',
               choices: [80, 100, 120],
            },
            {
               name: 'p_singleQuote',
               type: 'list',
               message: 'Do you prefer single quotes?',
               choices: ['yes', 'no'],
            },
            {
               name: 'p_useTabs',
               type: 'list',
               message: 'Do you prefer tabs?',
               choices: ['yes', 'no'],
            },
            {
               name: 'p_trailingComma',
               type: 'list',
               message: 'Do you prefer trailing comma?',
               choices: ['es5', 'All', 'none'],
            },
            {
               name: 'p_tabWidth',
               type: 'list',
               message: 'Your desired tab width?',
               choices: [2, 3, 4],
            },
            {
               name: 'p_semi',
               type: 'list',
               message: 'Do you prefer semicolons?',
               choices: ['yes', 'no'],
            },
            {
               name: 'p_arrowParens',
               type: 'list',
               message: 'Do you prefer parenthesis in arrow functions?',
               choices: ['avoid', 'always'],
            },
         ])
         .then(
            ({
               p_printWidth,
               p_singleQuote,
               p_useTabs,
               p_trailingComma,
               p_tabWidth,
               p_semi,
               p_arrowParens,
            }) => {
               resolve({
                  p_printWidth,
                  p_singleQuote,
                  p_useTabs,
                  p_trailingComma,
                  p_tabWidth,
                  p_semi,
                  p_arrowParens,
               })
            }
         )
   })

export const askTypescript = () =>
   new Promise(resolve => {
      inquirer
         .prompt([
            {
               name: 'ts_outDir',
               type: 'list',
               message: 'Desired output directory?',
               choices: ['dist', 'build'],
            },
            {
               name: 'ts_target',
               type: 'list',
               message: 'Desired compilation target?',
               choices: ['ES5', 'ES6', 'ES3', 'ESNext'],
            },
            {
               name: 'ts_strict',
               type: 'list',
               message: 'Do you prefer strict mode?',
               choices: ['yes', 'no'],
            },
         ])
         .then(({ ts_outDir, ts_target, ts_strict }) => {
            resolve({
               ts_outDir,
               ts_target,
               ts_strict,
            })
         })
   })

export const askConf = () =>
   new Promise(resolve => {
      inquirer
         .prompt([
            {
               name: 'get_config',
               type: 'list',
               message: 'Which config would you like to generage?',
               choices: ['.prettierrc', 'tsconfig.json'],
            },
         ])
         .then(answer => {
            resolve(answer.get_config)
         })
   })
