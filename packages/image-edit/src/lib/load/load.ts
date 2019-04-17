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
    const loadFileWorker = new Worker()
    loadFileWorker.postMessage({ file })
    const returnFile = (event: any) => {
      if (!event.data) reject('failed load file.')
      resolve(event.data as FileInfo)
    }
    loadFileWorker.addEventListener('message', returnFile)
    window.setTimeout(() => {
      loadFileWorker.removeEventListener('message', returnFile)
      reject('failed load file.')
    }, 10000)
  })
}
