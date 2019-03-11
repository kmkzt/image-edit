# Edit Image Client Library

Easy edit image client library. Uses the Browser's Canvas API library.

## (Demo)[https://kmkzt.github.io/image-edit/]

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

## UI Library

[React-image-edit](./packages/react-image-edit)

## feature

- [x] compress image
- [ ] drawing image
- [ ] effect image
- [x] edit image UI
  - [x] React
  - [ ] Web Components
