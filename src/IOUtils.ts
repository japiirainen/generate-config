import { createInterface } from 'readline'
import path from 'path'
import { writeFile, readFile } from 'fs/promises'
import { Task, fromIO, chain } from 'fp-ts/lib/Task'
import { log } from 'fp-ts/lib/Console'
import { flow } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither'
import { toError } from 'fp-ts/lib/Either'
import { confsIn, genPrettier, genTs } from './confGenerators'
import { askConf, askPrettier, askTypescript } from './inquiries'

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

export const writeDefault = async (configs: confsIn, arg: string) => {
   if (arg === '-p') {
      const fileContent = await read(configs.prettier)
      return await write('.prettierrc', fileContent)
   }
   if (arg === '-ts') {
      const fileContent = await read(configs.ts)
      return await write('tsconfig.json', fileContent)
   } else {
      return console.log(
         'For default prettier config run with: -p\nFor default typescript config run with: -ts\nOtherwise run with no args!'
      )
   }
}

export const genSpecific = async (configs: confsIn) => {
   const confName = await askConf()
   if (confName === '.prettierrc') {
      const {
         p_printWidth,
         p_singleQuote,
         p_useTabs,
         p_trailingComma,
         p_tabWidth,
         p_semi,
         p_arrowParens,
      }: any = await askPrettier()
      const res = genPrettier(
         p_printWidth,
         p_singleQuote,
         p_useTabs,
         p_trailingComma,
         p_tabWidth,
         p_semi,
         p_arrowParens
      )
      return await write('.prettierrc', res)
   }

   if (confName === 'tsconfig.json') {
      const { ts_outDir, ts_target, ts_strict }: any = await askTypescript()
      const res = genTs(ts_outDir, ts_target, ts_strict)
      return await write('tssconfig.json', res)
   }
}
