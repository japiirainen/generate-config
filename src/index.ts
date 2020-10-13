#!/usr/bin/env node
import { genSpecific, writeDefault } from './helpers'
import { confs, confsIn } from './conf'
import { Task } from 'fp-ts/lib/Task'

const main = async (configs: confsIn): Promise<void> => {
   const [arg] = process.argv.slice(2)
   if (arg) {
      return await writeDefault(configs, arg)
   } else {
      return await genSpecific(configs)
   }
}

main(confs)
