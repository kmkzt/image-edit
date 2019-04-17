import { loadFile } from '@/lib/load'
import { FileInfo } from './load'
onmessage = async (input: any): Promise<void> => {
  const { file } = input.data
  const res: FileInfo = await loadFile(file)
  console.log(res)
  postMessage(res)
}
