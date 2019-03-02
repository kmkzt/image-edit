import Compressor from 'compressorjs'
type ExcludeKey<T, K extends keyof T> = Pick<
  T,
  Exclude<keyof T, keyof Pick<T, K>>
>

type Options = ExcludeKey<Compressor.Options, 'success' | 'error'>
type SuccessAction = Compressor.Options['success']
type ErrorAction = Compressor.Options['error']

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
  convertSize: 200000
}
export async function imageCompress(
  file: File | Blob,
  options: Options = defaultOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    const success: SuccessAction = (file: Blob) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e: ProgressEvent) => {
        if (e.target) {
          resolve((e.target as any).result)
        }
      }
    }
    const error: ErrorAction = (err: Error) => {
      reject(err)
    }
    new Compressor(file, {
      ...options,
      success,
      error
    })
  })
}
