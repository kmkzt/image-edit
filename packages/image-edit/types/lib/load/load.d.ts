export interface FileInfo {
    name: string;
    url: string;
    mimeType: string;
}
export declare function loadImage(file: FileInfo): Promise<HTMLImageElement>;
export declare function loadFile(file: File | Blob): Promise<FileInfo>;
