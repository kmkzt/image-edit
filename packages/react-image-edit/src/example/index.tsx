import React, { useCallback, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { DropFile, DisplayFile, InputFile } from '@/components/'
import edit, { EditOption } from 'image-edit'

const defaultOption: EditOption = {
  quality: 0.7,
  rotate: 10,
  scaleX: 1,
  scaleY: 1,
  minWidth: 0,
  minHeight: 0,
  maxWidth: Infinity,
  maxHeight: Infinity,
  mimeType: 'image/jpeg'
}
function App({}) {
  const [files, setFiles] = useState<File[]>([])
  const [selectedIndex, changeIndex] = useState<number>(0)
  const [editImage, changeEdit] = useState<string | null>()
  const [options, changeOption] = useState<EditOption>(defaultOption)
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
  const handleChangeSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    [selectedIndex]
  )
  const editFile = useCallback(async () => {
    if (files[selectedIndex]) {
      changeEdit(await edit(files[selectedIndex], options))
    }
  }, [editImage, selectedIndex, files, options])

  useEffect(() => {
    editFile()
  }, [files, options, selectedIndex])
  return (
    <>
      <DropFile fileAction={handleFile}>
        <span>Select or Drop file</span>
      </DropFile>
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
            style={{
              width: '100%',
              heigth: 'auto',
              filter: i === selectedIndex ? 'grayscale(0)' : 'grayscale(100)'
            }}
            file={file}
            onClick={selectFile(i)}
          />
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* TODO: Quality
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
        </label> */}
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
        <label>
          <span>scaleX</span>
          <input
            name="scaleX"
            type="number"
            step={0.1}
            min={0.5}
            max={2}
            value={options.scaleX}
            onChange={handleChangeInput}
          />
        </label>
        <label>
          <span>scaleY</span>
          <input
            name="scaleY"
            type="number"
            step={0.1}
            min={0.5}
            max={2}
            value={options.scaleY}
            onChange={handleChangeInput}
          />
        </label>
        <label>
          <span>minWidth</span>
          <input
            name="minWidth"
            type="number"
            step={10}
            value={options.minWidth}
            onChange={handleChangeInput}
          />
        </label>
        <label>
          <span>minHeight</span>
          <input
            name="minHeight"
            type="number"
            step={10}
            value={options.minHeight}
            onChange={handleChangeInput}
          />
        </label>
        <label>
          <span>maxWidth</span>
          <input
            name="maxWidth"
            type="number"
            step={10}
            min={50}
            value={options.maxWidth}
            onChange={handleChangeInput}
          />
        </label>
        <label>
          <span>maxHeight</span>
          <input
            name="maxHeight"
            type="number"
            step={10}
            min={50}
            value={options.maxHeight}
            onChange={handleChangeInput}
          />
        </label>
        <select
          name="mimeType"
          value={options.mimeType}
          onChange={handleChangeSelect}
        >
          <option value="image/jpeg">jpeg</option>
          <option value="image/png">png</option>
          <option value="image/webp">webP</option>
        </select>
        {JSON.stringify(options)}
      </div>
      {editImage && (
        <>
          <img style={{ width: '100%', height: '100%' }} src={editImage} />
          <a href={editImage} download>
            Download
          </a>
        </>
      )}
    </>
  )
}

const app: HTMLElement = document.createElement('div')
document.body.appendChild(app)
ReactDOM.render(<App />, app)
