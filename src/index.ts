#!/usr/bin/env node
import { genSpecific, writeDefault } from './helpers'
import { confs, confsIn } from './conf'

const main = async (configs: confsIn): Promise<void> => {
   await writeDefault(configs)
   await genSpecific(configs)
   return
}

main(confs)
