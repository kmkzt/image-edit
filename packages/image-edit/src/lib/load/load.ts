import { createObjectURL } from '@/util'
const WorkerFileReader = require(/* webpackChunkName: "workerFileReader" */ 'worker-loader!./reader')

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
    const loadFileWorker = new WorkerFileReader()
    loadFileWorker.postMessage({ file })
    const returnFile = (event: any) => {
      const readerFile: File | Blob | undefined =
        event.data && (event.data.file as File | Blob)
      const url: string | undefined =
        createObjectURL(readerFile) || (event.data && event.data.url)
      if (!url) reject('failed load file.')
      resolve({
        name: (file as File).name || new Date().toISOString(),
        url,
        mimeType: file.type
      } as FileInfo)
    }
    loadFileWorker.addEventListener('message', returnFile)
    window.setTimeout(() => {
      loadFileWorker.removeEventListener('message', returnFile)
      reject('failed load file.')
    }, 10000)
  })
}
