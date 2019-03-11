import React, { useCallback } from 'react'
import { InputFile } from '../InputFile'

interface Props {
  fileAction?: (file: File | FileList) => void
}

export const DropFile: React.SFC<
  Props & React.LabelHTMLAttributes<HTMLLabelElement>
> = ({ fileAction, children, style, ...other }) => {
  const onDropHandler = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault()
      const { files } = e.dataTransfer
      if (fileAction) {
        fileAction(files)
      }
    },
    [fileAction]
  )

  const preventHandler = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
  }, [])
  return (
    <label
      {...other}
      onDrop={onDropHandler}
      onDragOver={preventHandler}
      onDragEnter={preventHandler}
      style={
        style || {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#eee',
          border: '1px dashed #999',
          width: '100%',
          height: '300px'
        }
      }
    >
      <InputFile style={{ display: 'none' }} fileAction={fileAction} />
      {children}
    </label>
  )
}
