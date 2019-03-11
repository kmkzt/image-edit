import React, { FC, useCallback } from 'react'
interface Props {
  fileAction?: (file: File | FileList) => void
}

export const InputFile: FC<Props & React.HTMLAttributes<HTMLInputElement>> = ({
  fileAction,
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
      multiple
      accept="image/*"
      {...other}
    />
  )
}
