import { CreateBlobOption } from './util';
declare function imageConvert(input: File | Blob, options?: CreateBlobOption): Promise<string>;
export default imageConvert;
