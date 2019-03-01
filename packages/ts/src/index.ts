import { imageCompress } from '@/library'

const fetchImage = async () => {
  try {
    const res = await fetch('./sample.jpg')
    const data = await res.blob()
    return data
  } catch (err) {
    throw err
  }
}

const compressImgRender = (file: Blob) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  let compressImg: HTMLImageElement = document.createElement('img')
  reader.onload = (e: ProgressEvent) => {
    if (e.target) {
      compressImg.src = (e.target as any).result
    }
  }
  document.body.appendChild(compressImg)
}

const render = async () => {
  try {
    const orgImgData: Blob | undefined = await fetchImage()
    let orgImg: HTMLImageElement = document.createElement('img')
    if (orgImgData) {
      // orgImg.src = originalImage
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent) => {
        if (e.target) {
          orgImg.src = (e.target as any).result
        }
      }
      reader.readAsDataURL(orgImgData)
      document.body.appendChild(orgImg)

      imageCompress(orgImgData, compressImgRender as any, {
        quality: 0.01
      })
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

render()
