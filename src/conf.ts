import path from 'path'

export interface confsIn {
   prettier: string
   ts: string
}
export const confs: confsIn = {
   prettier: path.join(__dirname, '..', 'configs', '.prettierrc'),
   ts: path.join(__dirname, '..', 'configs', 'tsconfig.json'),
}
