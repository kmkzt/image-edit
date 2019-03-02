# Get Started

```shell
yarn add image-edit
```

```javascript
import { imageCompress } from 'image-edit'

const res = await fetch('./sample.jpg')
const file = await res.blob()
const compImg = imageCompress(file, { quality: 0.7 })
```


