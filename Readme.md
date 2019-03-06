# Edit Image Client Library

Easy edit image client library. Uses the Browser's Canvas API library.

## Usage

```javascript
import imageConvert from 'image-edit'

const res = await fetch('./sample.jpg')
const file = await res.blob()

// imageConvert(f: File | Blob, Options)
const compImg = imageConvert(file, { quality: 0.7 })
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

## feature

- [x] compress image
- [ ] drawing image
- [ ] effect image
- [ ] edit image UI
  - [ ] React
  - [ ] Web Components
