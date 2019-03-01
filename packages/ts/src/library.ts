import Compressor from 'compressorjs';

type ExcludeKey<T, K extends keyof T> = Pick<
  T,
  Exclude<keyof T, keyof Pick<T, K>>
>

const defaultOptions: Compressor.Options = {
  strict: true,
  checkOrientation: true,
  maxWidth: undefined,
  maxHeight: undefined,
  minWidth: 0,
  minHeight: 0,
  width: undefined,
  height: undefined,
  quality: 0.7,
  mimeType: '',
  convertSize: 2000000,
}
export function imageCompress(file: File | Blob, success: Pick<Compressor.Options, 'success'>, options: ExcludeKey<Compressor.Options, 'success'> = defaultOptions){

  new Compressor(file, {
    ...options,
    success: success as any
  });

}
