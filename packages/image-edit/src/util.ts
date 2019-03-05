import { resolve } from 'url'

interface Option {
  strict?: true
  checkOrientation?: true
  maxWidth?: undefined
  maxHeight?: undefined
  minWidth?: 0
  minHeight?: 0
  width?: number
  height?: number
  quality?: 0.7
  mimeType?: ''
  convertSize?: 200000
}

interface FileInfo {
  name: string
  url: string
  mimeType: string
}

interface DrawParam {
  width: number
  height: number
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  rotate?: number
}
interface DrawCanvasSize {
  width: number
  height: number
  imageWidth: number
  imageHeight: number
}

const createObjectURL = (file: File | Blob): string | null =>
  window.URL ? window.URL.createObjectURL(file) : null

const revokeObjectURL = (src: string) =>
  window.URL ? window.URL.revokeObjectURL(src) : null

async function loadImage(file: FileInfo): Promise<HTMLImageElement> {
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

async function loadFile(file: File, cancel?: any): Promise<FileInfo> {
  return new Promise((resolve, reject) => {
    let reader: FileReader | null = new FileReader()
    if (reader) {
      reader.onload = (e: ProgressEvent) => {
        const mimeType: string = file.type
        const url =
          file.type === 'image/jpeg'
            ? createObjectURL(file)
            : (e.target as any).result
        resolve({
          name: file.name,
          url,
          mimeType
        })
      }
      reader.onabort = () =>
        reject(new Error('Aborted to read the image with FileReader.'))
      reader.onerror = () =>
        reject(new Error('Failed to read the image with FileReader.'))
      reader.onloadend = () => (reader = null)
    } else {
      reject(new Error('Failed to read the image with FileReader.'))
    }
  })
}

async function createBlob(
  image: HTMLImageElement,
  {
    fillStyle = 'transparent',
    rotate = 0,
    x = 0,
    y = 0,
    scaleX = 1,
    scaleY = 1,
    quality = 0.7,
    mimeType = 'image/jpeg'
  }: any
): Promise<Blob | null> {
  return new Promise((resolve, reject) => {
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d')
    if (!context) {
      reject(new Error('Not Supported Canvas'))
      return
    }
    const width = image.naturalWidth
    const height = image.naturalHeight
    canvas.width = width
    canvas.height = height
    context.fillStyle = fillStyle
    context.fillRect(0, 0, width, height)
    context.save()
    context.translate(width / 2, height / 2)
    context.rotate((rotate * Math.PI) / 180)
    context.scale(scaleX, scaleY)
    context.drawImage(image, x, y, width, height)
    context.restore()
    const blobSuccess = (blob: Blob | null) => resolve(blob)
    canvas.toBlob(blobSuccess, mimeType, quality)
  })
}

function getDrawImageSize({
  rotate,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight
}: DrawParam): DrawCanvasSize {
  return {
    width,
    height,
    imageWidth: width,
    imageHeight: height
  }
}
