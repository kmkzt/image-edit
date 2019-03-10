# image-edit

eazy image compress client web library.

## Get Started

```shell
yarn add image-edit
```

## Usage

```javascript
import imageEdit from 'image-edit'

const res = await fetch('./sample.jpg')
const file = await res.blob()
const compImg = imagEdit(file, { quality: 0.7 })
```

### Options

- fillStyle
- rotate
- scaleX
- scaleY
- width
- height
- maxWidth
- maxHeight
- minWidth
- minHeight
- quality
- mimeType

## Licence

MIT
