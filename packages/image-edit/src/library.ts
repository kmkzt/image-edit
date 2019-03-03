import Compressor from 'compressorjs'
type ExcludeKey<T, K extends keyof T> = Pick<
  T,
  Exclude<keyof T, keyof Pick<T, K>>
>

export type Options = ExcludeKey<Compressor.Options, 'success' | 'error'>

async function imageConvert(
  file: File | Blob,
  options: Options = {
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
    convertSize: 200000
  }
): Promise<string> {
  return new Promise(
    (resolve, reject) =>
      new Compressor(file, {
        ...options,
        success: (file: Blob) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = (e: ProgressEvent) => {
            if (e.target) {
              resolve((e.target as any).result)
            }
          }
        },
        error: (err: Error) => {
          reject(err)
        }
      })
  )
}

export default imageConvert