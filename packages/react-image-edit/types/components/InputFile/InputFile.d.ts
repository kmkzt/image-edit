import React, { FC } from 'react';
interface Props {
    fileAction?: (file: File | FileList) => void;
}
export declare const InputFile: FC<Props & React.HTMLAttributes<HTMLInputElement>>;
export {};
