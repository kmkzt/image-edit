import { createObjectURL } from '@/util'
import Worker from 'worker-loader!./worker'

export interface FileInfo {
  name: string
  url: string
  mimeType: string
}

export async function loadImage(file: FileInfo): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image: HTMLImageElement = new Image()
    image.onload = () => {
      resolve(image)
    }
    image.onabort = () => {
      reject(new Error('Aborted to load the image.'))
    }
    image.onerror = () => {
      reject(new Error('Failed to load the image.'))
    }
    image.alt = file.name
    image.src = file.url
  })
}

export async function loadFile(file: File | Blob): Promise<FileInfo> {
  return new Promise((resolve, reject) => {
    let reader: FileReader | null = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e: ProgressEvent) => {
      const mimeType: string = file.type
      const url: string = createObjectURL(file) || (e.target as any).result
      resolve({
        name: (file as File).name || new Date().toISOString(),
        url,
        mimeType
      })
    }
    reader.onabort = () =>
      reject(new Error('Aborted to read the image with FileReader.'))
    reader.onerror = () =>
      reject(new Error('Failed to read the image with FileReader.'))
    reader.onloadend = () => (reader = null)
  })
}

export const loadFileWorker = (file: File | Blob): Promise<FileInfo> =>
  new Promise((resolve, reject) => {
    const loadFileWorker = new Worker()
    loadFileWorker.postMessage({ file })
    loadFileWorker.addEventListener('message', (event: any) => {
      if (!event.data) reject('failed load file.')
      resolve(event.data as FileInfo)
    })
    window.setTimeout(() => reject('failed load file.'), 10000)
  })
