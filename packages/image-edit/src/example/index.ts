import imageCompress from '@/library'

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
    let compressImg: HTMLImageElement = new Image()
    compressImg.src = await imageCompress(file, option)
    const divEle = document.createElement('div')
    const pEle = document.createElement('p')
    pEle.innerHTML = JSON.stringify(option)
    divEle.appendChild(compressImg)
    divEle.appendChild(pEle)
    const app = document.getElementById('app')
    if (app) {
      app.appendChild(divEle)
    }
  } catch (err) {
    throw err
  }
}

const render = async () => {
  try {
    const orgImgData: Blob | undefined = await fetchImage()
    if (orgImgData) {
      compressImgRender(orgImgData, { quality: 1, width: 600 })
      compressImgRender(orgImgData, { quality: 0.9, width: 600 })
      compressImgRender(orgImgData, { quality: 0.8, width: 600 })
      compressImgRender(orgImgData, { quality: 0.7, width: 600 })
      compressImgRender(orgImgData, { quality: 0.6, width: 600 })
      compressImgRender(orgImgData, { quality: 0.5, width: 600 })
      compressImgRender(orgImgData, { quality: 0.4, width: 600 })
      compressImgRender(orgImgData, { quality: 0.3, width: 600 })
      compressImgRender(orgImgData, { quality: 0.2, width: 600 })
      compressImgRender(orgImgData, { quality: 0.1, width: 600 })
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

render()
