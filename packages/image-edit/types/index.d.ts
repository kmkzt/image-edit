import { CreateBlobOption } from './lib';
export declare type EditOption = Partial<CreateBlobOption>;
declare function edit(input: File | Blob, options: EditOption): Promise<string>;
export * from './lib';
export default edit;
