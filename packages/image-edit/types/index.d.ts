import { CreateBlobOption } from './lib';
declare function imageConvert(input: File | Blob, options: CreateBlobOption): Promise<string>;
export * from './lib';
export default imageConvert;
