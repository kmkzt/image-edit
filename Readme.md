# Edit Image Client Library

Easy edit image client library. Uses the Browser's Canvas API library.

## Get Started

```shell
yarn add image-edit
```

## Usage

```javascript
import imageConvert from 'image-edit'

const res = await fetch('./sample.jpg')
const file = await res.blob()

// imageConvert(f: File | Blob, Options)
const compImg = imageConvert(file, { quality: 0.7 })
```

## UI Library

[React-image-edit](./packages/react-image-edit)

## feature

- [x] compress image
- [ ] drawing image
- [ ] effect image
- [x] edit image UI
  - [x] React
  - [ ] Web Components
