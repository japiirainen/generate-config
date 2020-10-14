#!/usr/bin/env node
import { genSpecific, writeDefault } from './IOUtils'
import { confs, confsIn } from './confGenerators'

const main = async (configs: confsIn): Promise<void> => {
   const [arg] = process.argv.slice(2)
   if (arg) {
      return await writeDefault(configs, arg)
   } else {
      return await genSpecific(configs)
   }
}

main(confs)
