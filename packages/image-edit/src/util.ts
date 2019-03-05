import { resolve } from 'url'

interface Option {
  fillStyle: string
  rotate: number
  scaleX: number
  scaleY: number
  width?: number
  height?: number
  maxWidth: number
  maxHeight: number
  minWidth: number
  minHeight: number
  quality: number
  mimeType: string
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
  canvasWidth: number
  canvasHeight: number
}

const createObjectURL = (file: File | Blob): string | null =>
  window.URL ? window.URL.createObjectURL(file) : null

const revokeObjectURL = (src: string) =>
  window.URL ? window.URL.revokeObjectURL(src) : null

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

export async function loadFile(file: File, cancel?: any): Promise<FileInfo> {
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

export async function createBlob(
  image: HTMLImageElement,
  {
    fillStyle = 'transparent',
    rotate = 0,
    scaleX = 1,
    scaleY = 1,
    width: w,
    height: h,
    minWidth = 0,
    minHeight = 0,
    maxWidth = 0,
    maxHeight = 0,
    quality = 0.7,
    mimeType = 'image/jpeg'
  }: Option
): Promise<Blob | null> {
  return new Promise((resolve, reject) => {
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d')
    if (!context) {
      reject(new Error('Not Supported Canvas'))
      return
    }
    const { canvasWidth: width, canvasHeight: height } = getDrawImageSize({
      width: w || image.naturalWidth,
      height: h || image.naturalHeight,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight
    })

    const translateX: number = width / 2
    const translateY: number = height / 2
    const destX: number = -translateX
    const destY = -translateY
    const destWidth = width
    const destHeight = height

    const canvasW = is90DegreesRotated(rotate) ? height : width
    const canvasH = is90DegreesRotated(rotate) ? width : height

    canvas.width = canvasW
    canvas.height = canvasH

    context.fillStyle = fillStyle
    context.fillRect(0, 0, canvasW, canvasH)
    context.save()
    context.translate(translateX, translateY)
    context.rotate((rotate * Math.PI) / 180)
    context.scale(scaleX, scaleY)
    context.drawImage(image, destX, destY, destWidth, destHeight)
    context.restore()
    const blobSuccess = (blob: Blob | null) => {
      revokeObjectURL(image.src)
      resolve(blob)
    }
    canvas.toBlob(blobSuccess, mimeType, quality)
  })
}

const is90DegreesRotated = (rotate: number) => Math.abs(rotate) % 180 === 90

/**
 * Normalize decimal number.
 * Check out {@link http://0.30000000000000004.com/}
 * @param {number} value - The value to normalize.
 * @param {number} [times=100000000000] - The times for normalizing.
 * @returns {number} Returns the normalized number.
 */
const REGEXP_DECIMALS = /\.\d*(?:0|9){12}\d*$/
function normalizeDecimalNumber(value: number, times: number = 100000000000) {
  return REGEXP_DECIMALS.test(String(value))
    ? Math.round(value * times) / times
    : value
}

interface WidthHeight {
  width: number
  height: number
}
function getDrawImageSize({
  rotate = 0,
  width: naturalWidth,
  height: naturalHeight,
  minWidth = 0,
  minHeight = 0,
  maxWidth = Infinity,
  maxHeight = Infinity
}: DrawParam): DrawCanvasSize {
  if (is90DegreesRotated(rotate)) {
    return getDrawImageSize({
      width: naturalHeight,
      height: naturalWidth,
      minWidth: minHeight,
      minHeight: minWidth,
      maxWidth: maxHeight,
      maxHeight: maxWidth
    })
  }

  const aspectRatio: number = naturalWidth / naturalHeight

  const heightLargerThanWidth = (h: number, w: number) => h * aspectRatio > w

  const max: WidthHeight =
    maxWidth < Infinity && maxHeight < Infinity
      ? {
          width: heightLargerThanWidth(maxHeight, maxWidth)
            ? maxWidth
            : maxHeight * aspectRatio,
          height: heightLargerThanWidth(maxHeight, maxWidth)
            ? maxWidth / aspectRatio
            : maxHeight
        }
      : maxWidth < Infinity
      ? {
          width: maxWidth,
          height: maxWidth / aspectRatio
        }
      : maxHeight < Infinity
      ? {
          width: maxHeight * aspectRatio,
          height: maxHeight
        }
      : {
          width: maxWidth,
          height: maxHeight
        }
  const min: WidthHeight =
    minWidth > 0 && minHeight > 0
      ? {
          width: heightLargerThanWidth(minHeight, minWidth)
            ? minWidth
            : minHeight * aspectRatio,
          height: heightLargerThanWidth(minHeight, minWidth)
            ? minWidth / aspectRatio
            : minHeight
        }
      : minWidth > 0
      ? {
          width: minWidth,
          height: minWidth / aspectRatio
        }
      : minHeight > 0
      ? {
          width: minHeight * aspectRatio,
          height: minHeight
        }
      : {
          width: minWidth,
          height: minHeight
        }

  const base: WidthHeight = heightLargerThanWidth(naturalHeight, naturalWidth)
    ? {
        width: naturalWidth,
        height: naturalWidth / aspectRatio
      }
    : {
        width: naturalHeight * aspectRatio,
        height: naturalHeight
      }

  return {
    canvasWidth: Math.floor(
      normalizeDecimalNumber(
        Math.min(Math.max(base.width, min.width), max.width)
      )
    ),
    canvasHeight: Math.floor(
      normalizeDecimalNumber(
        Math.min(Math.max(base.height, min.height), max.height)
      )
    )
  }
}
