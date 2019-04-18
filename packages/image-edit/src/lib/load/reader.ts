self.onmessage = async (message: MessageEvent): Promise<void> => {
  try {
    const file = message.data.file as File | Blob
    let reader: FileReader | null = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e: ProgressEvent) => {
      const url: string = (e.target as any).result
      const ctx: Worker = self as any
      ctx.postMessage({ file, url })
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
