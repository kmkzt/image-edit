import React, { useCallback, useState } from 'react'
import ReactDOM from 'react-dom'
import { FileDrop, DisplayFile, InputFile } from '@/components/'
import edit, { FileInfo, createBlob, loadImage } from 'image-edit'

function App({}) {
  const [files, setFiles] = useState<File[]>([])
  const [editImage, changeEdit] = useState<string | null>()
  const handleFile = useCallback(
    (f: File | FileList) => {
      setFiles([...files, ...Object.values(f)])
    },
    [files]
  )
  const selectFile = useCallback(
    (i: number) => async (e: React.MouseEvent) => {
      const image: string = await edit(files[i], {
        quality: 0.7,
        rotate: 10
      } as any)
      changeEdit(image)
    },
    [files, editImage]
  )
  return (
    <>
      <FileDrop fileAction={handleFile}>
        <InputFile fileAction={handleFile} />
      </FileDrop>
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
            onClick={selectFile(i)}
          />
        ))}
      </div>
      {editImage && <img src={editImage} />}
    </>
  )
}

const app: HTMLElement = document.createElement('div')
document.body.appendChild(app)
ReactDOM.render(<App />, app)
