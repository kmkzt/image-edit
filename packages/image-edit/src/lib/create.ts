import {
  revokeObjectURL,
  getRadian,
  is90Deg,
  normalizeDecimalNumber
} from '@/util'

export interface CreateBlobOption {
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
interface DrawParam {
  width: number
  height: number
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  rotate?: number
}
interface DrawImageSize {
  width: number
  height: number
}

const defaultCreateBlobOption: CreateBlobOption = {
  fillStyle: 'transparent',
  rotate: 0,
  scaleX: 1,
  scaleY: 1,
  minWidth: 0,
  minHeight: 0,
  maxWidth: Infinity,
  maxHeight: Infinity,
  quality: 0.7,
  mimeType: 'image/jpeg'
}
export async function createBlob(
  image: HTMLImageElement,
  option: Partial<CreateBlobOption>
): Promise<Blob | null> {
  const {
    fillStyle,
    rotate,
    scaleX,
    scaleY,
    width: w,
    height: h,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    quality,
    mimeType
  }: CreateBlobOption = {
    ...defaultCreateBlobOption,
    ...option
  }

  return new Promise((resolve, reject) => {
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d')
    if (!context) {
      reject(new Error('Not Supported Canvas'))
      return
    }

    const radian = getRadian(rotate)
    const { width, height } = getDrawImageSize({
      width: image.naturalWidth,
      height: image.naturalHeight,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight
    })

    // drawImageSize
    const destWidth: number = width * scaleX
    const destHeight: number = height * scaleY
    const destX: number = -destWidth / 2
    const destY: number = -destHeight / 2
    // canvasSize
    const canvasW: number =
      destWidth * Math.cos(radian) + destHeight * Math.sin(radian)
    const canvasH: number =
      destWidth * Math.sin(radian) + destHeight * Math.cos(radian)
    const translateX: number = canvasW / 2
    const translateY: number = canvasH / 2

    canvas.width = canvasW
    canvas.height = canvasH

    context.fillStyle = fillStyle
    context.fillRect(0, 0, canvasW, canvasH)
    context.save()
    context.translate(translateX, translateY)
    context.rotate(radian)
    context.drawImage(image, destX, destY, destWidth, destHeight)
    context.restore()
    const blobSuccess = (blob: Blob | null) => {
      revokeObjectURL(image.src)
      resolve(blob)
    }

    canvas.toBlob(blobSuccess, mimeType, quality)
  })
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
}: DrawParam): DrawImageSize {
  if (is90Deg(rotate)) {
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
    width: Math.floor(
      normalizeDecimalNumber(
        Math.min(Math.max(base.width, min.width), max.width)
      )
    ),
    height: Math.floor(
      normalizeDecimalNumber(
        Math.min(Math.max(base.height, min.height), max.height)
      )
    )
  }
}
