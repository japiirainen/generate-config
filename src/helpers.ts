import { createInterface } from 'readline'
import path from 'path'
import inquirer from 'inquirer'
import { writeFile, readFile } from 'fs/promises'
import { Task, fromIO, chain } from 'fp-ts/lib/Task'
import { log } from 'fp-ts/lib/Console'
import { flow } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither'
import { toError } from 'fp-ts/lib/Either'

const getStrLn: Task<string> = () =>
   new Promise(resolve => {
      const rl = createInterface({
         input: process.stdin,
         output: process.stdout,
      })
      rl.question('> ', answer => {
         rl.close()
         resolve(answer)
      })
   })

export const putStrLn = flow(log, fromIO)

export function ask(question: string): Task<string> {
   return pipe(
      putStrLn(question),
      chain(() => getStrLn)
   )
}
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

export const write_ = (conf: string, content: string): TaskEither<Error, void> =>
   tryCatch(() => writeFile(path.join(process.cwd(), `${conf}`), content), toError)

export const write = async (fileName: string, content: string): Promise<void> => {
   try {
      await writeFile(path.join(process.cwd(), `${fileName}`), content)
      console.log(`${fileName} generated succesfully!`)
   } catch (e) {
      console.error('Writing failed')
   }
}

export const read = async (path: string): Promise<string> => {
   try {
      const fileContents = await readFile(path, 'utf-8')
      return fileContents.toString()
   } catch (e) {
      console.error('error', e)
      return ''
   }
}
