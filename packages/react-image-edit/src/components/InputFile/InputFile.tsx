import React, { FC, useCallback } from 'react'
interface Props {
  fileAction?: (file: File | FileList) => void
}

export const InputFile: FC<Props & React.HTMLAttributes<HTMLInputElement>> = ({
  fileAction,
  style,
  ...other
}) => {
  const handleFiles = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (fileAction && files) {
      fileAction(files)
      return
    }
  }, [])
  return (
    <input
      type="file"
      onChange={handleFiles}
      style={style || { display: 'none' }}
      multiple
      accept="image/*"
      {...other}
    />
  )
}
