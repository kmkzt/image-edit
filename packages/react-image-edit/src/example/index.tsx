import React, { useCallback, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { FileDrop, DisplayFile, InputFile } from '@/components/'
import edit, { FileInfo, createBlob, loadImage, EditOption } from 'image-edit'

function App({}) {
  const [files, setFiles] = useState<File[]>([])
  const [selectedIndex, changeIndex] = useState<number>(0)
  const [editImage, changeEdit] = useState<string | null>()
  const [options, changeOption] = useState<EditOption>({
    quality: 0.7,
    rotate: 10
  })
  const handleFile = useCallback(
    (f: File | FileList) => {
      setFiles([...files, ...Object.values(f)])
    },
    [files]
  )
  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      if (name) {
        changeOption({
          ...options,
          [name]: value
        })
      }
    },
    [options]
  )
  const selectFile = useCallback(
    (i: number) => (e: React.MouseEvent) => {
      changeIndex(i)
    },
    [files, editImage]
  )
  const editFile = useCallback(async () => {
    if (selectedIndex < files.length) {
      changeEdit(await edit(files[selectedIndex], options))
    }
  }, [editImage, selectedIndex, files, options])

  useEffect(() => {
    editFile()
  }, [options, selectedIndex])
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
      <div>
        <label>
          <span>quality</span>
          <input
            name="quality"
            type="number"
            step={0.01}
            min={0.01}
            max={1}
            value={options.quality}
            onChange={handleChangeInput}
          />
        </label>
        <label>
          <span>rotate</span>
          <input
            name="rotate"
            type="number"
            step={1}
            min={0}
            max={360}
            value={options.rotate}
            onChange={handleChangeInput}
          />
        </label>
        {JSON.stringify(options)}
      </div>
      {editImage && <img src={editImage} />}
    </>
  )
}

const app: HTMLElement = document.createElement('div')
document.body.appendChild(app)
ReactDOM.render(<App />, app)
