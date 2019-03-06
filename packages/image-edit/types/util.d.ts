export interface CreateBlobOption {
    fillStyle: string;
    rotate: number;
    scaleX: number;
    scaleY: number;
    width?: number;
    height?: number;
    maxWidth: number;
    maxHeight: number;
    minWidth: number;
    minHeight: number;
    quality: number;
    mimeType: string;
}
export interface FileInfo {
    name: string;
    url: string;
    mimeType: string;
}
export declare function loadImage(file: FileInfo): Promise<HTMLImageElement>;
export declare function loadFile(file: File | Blob): Promise<FileInfo>;
export declare function createBlob(image: HTMLImageElement, { fillStyle, rotate, scaleX, scaleY, width: w, height: h, minWidth, minHeight, maxWidth, maxHeight, quality, mimeType }: CreateBlobOption): Promise<Blob | null>;
