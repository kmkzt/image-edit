import Compressor from 'compressorjs';
declare type ExcludeKey<T, K extends keyof T> = Pick<T, Exclude<keyof T, keyof Pick<T, K>>>;
export declare type Options = ExcludeKey<Compressor.Options, 'success' | 'error'>;
declare function imageConvert(file: File | Blob, options?: Options): Promise<string>;
export default imageConvert;
