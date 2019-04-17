import {
  loadFile,
  loadImage,
  createBlob,
  CreateBlobOption,
  FileInfo
  // loadFileWorker
} from './lib'

export type EditOption = Partial<CreateBlobOption>
async function edit(input: File | Blob, options: EditOption): Promise<string> {
  try {
    const file: FileInfo = await loadFile(input)
    const image: HTMLImageElement = await loadImage(file)
    const blob: Blob | null = await createBlob(image, options)
    if (!blob) {
      throw new Error('createBlob error')
    }
    const convertFile: FileInfo = await loadFile(blob)
    return convertFile.url
  } catch (err) {
    throw err
  }
}

export * from './lib'
export default edit
