# React Image Edit

image-edit ui library.

[Demo](https://kmkzt.github.io/image-edit/)

## Get Started

```shell
yarn add react-image-edit
```

## Usage

```tsx
import React, { useCallback, useState } from 'react'
import { DropFile, DisplayFile } from 'react-image-edit'

function App({}) {
  const [files, setFiles] = useState<File[]>([])

  const handleFile = useCallback(
    (f: File | FileList) => {
      setFiles([...files, ...Object.values(f)])
    },
    [files]
  )
  return (
    <>
      <DropFile fileAction={handleFile}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat( auto-fill, minmax(200px, 1fr))',
          rowGap: '5px',
          columnGap: '5px'
        }}
      >
        {files.map((file: File, i: number) => (
          <DisplayFile
            key={i}
            style={{ width: '100%', heigth: 'auto' }}
            file={file}
          />
        ))}
      </div>
    </>
  )
}
```
