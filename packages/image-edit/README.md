# image-edit

premitives image compress library.

## Get Started

```shell
yarn add image-edit
```

## Usage

```javascript
import { imageCompress } from 'image-edit'

const res = await fetch('./sample.jpg')
const file = await res.blob()
const compImg = imageCompress(file, { quality: 0.7 })
```

## Uses

- compressorjs
https://github.com/fengyuanchen/compressorjs

## Licence
MIT 
