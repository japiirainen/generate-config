#!/usr/bin/env node
import { askConf, write, read } from './helpers'
import { confs, confsIn } from './conf'

const main = async (configs: confsIn): Promise<void> => {
   const confName = await askConf()
   if (confName === '.prettierrc') {
      const fileContent = await read(configs.prettier)
      return await write('.prettierrc', fileContent)
   }
   if (confName === 'tsconfig.json') {
      const fileContent = await read(configs.ts)
      return await write('tsconfig.json', fileContent)
   }
}

main(confs)
