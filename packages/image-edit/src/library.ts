import {
  loadFile,
  loadImage,
  createBlob,
  CreateBlobOption,
  FileInfo
} from './util'

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
}

export default imageConvert
