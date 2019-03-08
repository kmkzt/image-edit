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
export declare function createBlob(image: HTMLImageElement, { fillStyle, rotate, scaleX, scaleY, width: w, height: h, minWidth, minHeight, maxWidth, maxHeight, quality, mimeType }: CreateBlobOption): Promise<Blob | null>;
