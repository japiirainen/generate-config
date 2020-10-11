import { createInterface } from 'readline'
import { log } from 'fp-ts/lib/Console'
import { flow } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import { Task, chain, fromIO } from 'fp-ts/lib/Task'

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

export const ask = (question: string): Task<string> =>
   pipe(
      putStrLn(question),
      chain(() => getStrLn)
   )
