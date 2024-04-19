import { writeSync } from 'fs'
import { fileSync } from 'tmp'

export function createTemporaryJsonFile(fileContent) {
  const tmpFile = fileSync({ postfix: '.json' })
  writeSync(tmpFile.fd, fileContent)
  return tmpFile.name
}
