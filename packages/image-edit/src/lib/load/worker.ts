import { FileInfo } from './load'

self.onmessage = async (message: MessageEvent): Promise<void> => {
  try {
    const { file } = message.data
    let reader: FileReader | null = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e: ProgressEvent) => {
      const mimeType: string = file.type
      const url: string = (e.target as any).result
      postMessage({
        name: (file as File).name || new Date().toISOString(),
        url,
        mimeType
      } as FileInfo)
    }
    reader.onabort = () => {
      throw 'Aborted to read the image with FileReader.'
    }
    reader.onerror = () => {
      throw 'Failed to read the image with FileReader.'
    }
    reader.onloadend = () => (reader = null)
  } catch (err) {
    throw err
  }
}
