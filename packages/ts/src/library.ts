import Compressor from 'compressorjs'
import { Options } from 'compressorjs/types'
type ExcludeKey<T, K extends keyof T> = Pick<
  T,
  Exclude<keyof T, keyof Pick<T, K>>
>

const defaultOptions: Options = {
  strict: true,
  checkOrientation: true,
  maxWidth: undefined,
  maxHeight: undefined,
  minWidth: 0,
  minHeight: 0,
  width: undefined,
  height: undefined,
  quality: 0.7,
  mimeType: '',
  convertSize: 2000000
}
export async function imageCompress(
  file: File | Blob,
  options: ExcludeKey<Compressor.Options, 'success'> = defaultOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    const success = (file: Blob) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e: ProgressEvent) => {
        if (e.target) {
          resolve((e.target as any).result)
        }
      }
    }
    const error = (err: Error) => {
      reject(err)
    }
    new Compressor(file, {
      ...options,
      success,
      error
    })
  })
}
