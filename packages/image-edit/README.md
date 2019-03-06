# image-edit

eazy image compress library.

## Get Started

```shell
yarn add image-edit
```

## Usage

```javascript
import imageConvert from 'image-edit'

const res = await fetch('./sample.jpg')
const file = await res.blob()
const compImg = imageConvert(file, { quality: 0.7 })
```

## Options

WIP

## Licence

MIT
