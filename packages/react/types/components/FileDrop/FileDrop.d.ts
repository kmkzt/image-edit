import React from 'react';
interface Props {
    fileAction?: (file: File | FileList) => void;
}
export declare const FileDrop: React.SFC<Props & React.LabelHTMLAttributes<HTMLLabelElement>>;
export {};
