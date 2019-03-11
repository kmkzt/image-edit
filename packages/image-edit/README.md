# image-edit

eazy image compress client web library.

[Demo](https://kmkzt.github.io/image-edit/)

## Get Started

```shell
yarn add image-edit
```

## Usage

```html
<input type="file" id="file" accept="image/*" />
```

```javascript
import edit from 'image-edit'

document.getElementById('file').addEventListener('change', async (e) => {
  const file = e.target.files[0];

  if (!file) {
    return;
  }
  try {
    const imageData = await edit(file, { quality: 0.7, mimeType: 'image/webp'})
    const fromData = new FormData()
    formData.append('file' imageData, file.name)
    await fetch('/path/to/upload', {
      method: 'post',
      body: formData
    })
  } catch (err) {
    console.log(err)
  }
})
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
