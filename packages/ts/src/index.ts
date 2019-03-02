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

const compressImgRender = async (file: Blob, option: any) => {
  try {
    let compressImg: HTMLImageElement = document.createElement('img')
    compressImg.src = await imageCompress(file, option)
    const app = document.getElementById('app')
    if (app) {
      app.appendChild(compressImg)
    }
  } catch (err) {
    throw err
  }
}

const render = async () => {
  try {
    const orgImgData: Blob | undefined = await fetchImage()
    if (orgImgData) {
      compressImgRender(orgImgData, { quality: 1, convertSize: 1000 })
      compressImgRender(orgImgData, { quality: 0.5, convertSize: 1000 })
      compressImgRender(orgImgData, { quality: 0.3, convertSize: 1000 })
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

render()
