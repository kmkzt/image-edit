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
  naturalWidth: number
  naturalHeight: number
}

const getObjectURL = (file: File | Blob): string | null => {
  if (window.URL) {
    return window.URL.createObjectURL(file)
  }
  return null
}

async function draw(
  file: File,
  {
    width = 200,
    height = 200,
    fillStyle = 'transparent',
    rotate = 0,
    scaleX,
    scaleY
  }: any
) {
  const canvas: HTMLCanvasElement = document.createElement('canvas')
  const context: CanvasRenderingContext2D | null = canvas.getContext('2d')
  if (!context) return
  canvas.width = width
  canvas.height = height
  context.fillRect(0, 0, width, height)
  context.save()
  context.translate(width / 2, height / 2)
  context.rotate((rotate * Math.PI) / 180)
  context.scale(scaleX, scaleY)
  context.drawImage(image, destX, destY, destWidth, destHeight)
  context.restore()
}

async function loadFile(file: File, cancel?: any): Promise<File> {
  return new Promise((resolve, reject) => {
    let reader: FileReader | null = new FileReader()
    if (reader) {
      reader.onload = (e: ProgressEvent) => {
        resolve(file)
      }
      reader.onabort = () => {
        reject(new Error('Aborted to read the image with FileReader.'))
      }
      reader.onerror = () => {
        reject(new Error('Failed to read the image with FileReader.'))
      }
      reader.onloadend = () => {
        reader = null
      }
    } else {
      reject(new Error('Failed to read the image with FileReader.'))
    }
  })
}
