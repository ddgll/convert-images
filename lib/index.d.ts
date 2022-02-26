export enum ConvertImageType {
  Webp = "webp",
  Png = "png",
  Jpeg = "jpeg",
  Gif = "gif",
  Bmp = "bmp",
}

export interface ConvertImageOptions {
  name?: string;
  download?: boolean;
  width?: number | null;
  height?: number | null;
  type?: ConvertImageType;
}
