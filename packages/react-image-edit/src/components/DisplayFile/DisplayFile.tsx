import React, { useState, useEffect, HTMLAttributes } from 'react'
import { loadFile as load, FileInfo } from 'image-edit'

interface Props {
  file: File
}

export const DisplayFile: React.FunctionComponent<
  Props & HTMLAttributes<HTMLImageElement>
> = ({ file, style, ...other }) => {
  const [src, setSrc] = useState<string | null>(null)
  const loadFile = async () => {
    try {
      const { url }: FileInfo = await load(file)
      setSrc(url)
    } catch (err) {
      throw new Error(err)
    }
  }
  useEffect(() => {
    loadFile()
  }, [file])

  if (!src) {
    return (
      <div
        style={
          style || {
            background: '#eee'
          }
        }
      />
    )
  }
  return <img {...other} style={style} src={src} />
}
