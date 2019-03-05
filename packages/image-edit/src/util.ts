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

const getObjectURL = (file: File | Blob): string | null =>
  window.URL ? window.URL.createObjectURL(file) : null

async function draw(
  originalFile: File,
  {
    width = 200,
    height = 200,
    fillStyle = 'transparent',
    rotate = 0,
    x = 0,
    y = 0,
    scaleX = 1,
    scaleY = 1,
    quality = 0.7,
    mimeType = 'image/jpeg'
  }: any
) {
  try {
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d')
    const image = new Image()
    image.onload = async () => {
      const file: FileInfo = await loadFile(originalFile)
      image.src = file.url
    }

    if (!context) return
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
    const getBlob = (blob: Blob | null) => {
      return blob
    }
    canvas.toBlob(getBlob, mimeType, quality)
  } catch (err) {
    throw err
  }
}

async function loadFile(file: File, cancel?: any): Promise<FileInfo> {
  return new Promise((resolve, reject) => {
    let reader: FileReader | null = new FileReader()
    if (reader) {
      reader.onload = (e: ProgressEvent) => {
        const mimeType: string = file.type
        const url =
          file.type === 'image/jpeg'
            ? URL.createObjectURL(file)
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
