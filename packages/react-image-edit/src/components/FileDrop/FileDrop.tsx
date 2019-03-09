import React, { useCallback } from 'react'

interface Props {
  fileAction?: (file: File | FileList) => void
}

export const FileDrop: React.SFC<
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
          display: 'block',
          background: '#eee',
          border: '1px dashed #999',
          width: '100%',
          height: '300px'
        }
      }
    >
      {children}
    </label>
  )
}
