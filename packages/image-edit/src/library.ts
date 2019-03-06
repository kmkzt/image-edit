import Compressor from 'compressorjs'
import {
  loadFile,
  loadImage,
  createBlob,
  CreateBlobOption,
  FileInfo
} from './util'
// type ExcludeKey<T, K extends keyof T> = Pick<
//   T,
//   Exclude<keyof T, keyof Pick<T, K>>
// >

// export type Options = ExcludeKey<Compressor.Options, 'success' | 'error'>

const defaultOption: CreateBlobOption = {
  fillStyle: 'transparent',
  rotate: 0,
  scaleX: 0,
  scaleY: 0,
  maxWidth: Infinity,
  maxHeight: Infinity,
  minWidth: 0,
  minHeight: 0,
  quality: 0.7,
  mimeType: ''
}
async function imageConvert(
  input: File | Blob,
  options: CreateBlobOption = defaultOption
): Promise<string> {
  try {
    const file = await loadFile(input)
    const image = await loadImage(file)
    const blob = await createBlob(image, options)
    if (!blob) {
      throw new Error('createBlob error')
    }
    const convertFile: FileInfo = await loadFile(blob)
    return convertFile.url
  } catch (err) {
    throw err
  }
  // return new Promise(
  //   (resolve, reject) =>
  //     new Compressor(file, {
  //       ...options,
  //       success: (file: Blob) => {
  //         const reader = new FileReader()
  //         reader.readAsDataURL(file)
  //         reader.onload = (e: ProgressEvent) => {
  //           if (e.target) {
  //             resolve((e.target as any).result)
  //           }
  //         }
  //       },
  //       error: (err: Error) => {
  //         reject(err)
  //       }
  //     })
  // )
}

export default imageConvert
