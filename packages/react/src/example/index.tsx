import React, { FC, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { FileDrop, DisplayFile } from '@/components/'
import { useState } from 'react'

const App: FC<{}> = ({}) => {
  const [files, setFiles] = useState<File[]>([])

  const handleFile = useCallback(
    (f: File | FileList) => {
      setFiles([...files, ...Object.values(f)])
    },
    [files]
  )
  return (
    <>
      <FileDrop fileAction={handleFile} />
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

const app: HTMLElement = document.createElement('div')
document.body.appendChild(app)
ReactDOM.render(<App />, app)
