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
export declare function createBlob(image: HTMLImageElement, option: Partial<CreateBlobOption>): Promise<Blob | null>;
