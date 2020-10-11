import { pipe } from 'fp-ts/lib/pipeable'
import { chain, Task } from 'fp-ts/lib/Task'
import { ask, putStrLn } from './helpers'

const main: Task<void> = pipe(
   ask('What is your name?'),
   chain(name => putStrLn(`Well hello ${name}!`))
)

main()
