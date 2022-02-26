import { ConvertImageType, ConvertImageOptions } from "./index.d";

export class ConvertImage {
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D | null;

  constructor() {
    this.#canvas = document.createElement("canvas");
    this.#ctx = this.#canvas.getContext("2d");

    document.body.append(this.#canvas);
  }

  convertImageFromUrl(
    url: string,
    options?: ConvertImageOptions
  ): Promise<string> {
    if (!url) return Promise.reject("No Url");
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.addEventListener(
        "load",
        this.#imageOnLoad(image, options || {}, resolve).bind(this)
      );
      image.addEventListener("error", reject);
      image.src = url;
    });
  }

  #getScale = (
    width: number,
    height: number,
    maxWidth: number | null | undefined,
    maxHeight: number | null | undefined
  ): number => {
    if (!maxWidth && !maxHeight) return 1;
    const sw = (maxWidth || maxHeight || 400) / width;
    const sh = (maxHeight || maxWidth || 400) / height;
    return sw > sh ? sh : sw;
  };

  #imageOnLoad =
    (
      image: HTMLImageElement,
      options: ConvertImageOptions,
      resolve: (value: string | PromiseLike<string>) => void
    ) =>
    (): void => {
      if (!this.#ctx) return;
      const mimeType: ConvertImageType =
        options && options.type ? options.type : ConvertImageType.Webp;
      const name: string = options && options.name ? options.name : "image";
      const scale = this.#getScale(
        image.width,
        image.height,
        options ? options.width : null,
        options ? options.height : null
      );
      this.#canvas.width = image.width * scale;
      this.#canvas.height = image.height * scale;
      this.#ctx.drawImage(image, 0, 0, this.#canvas.width, this.#canvas.height);
      const webp = this.#canvas.toDataURL(`image/${mimeType}`);
      if (!options || !options.download) return resolve(webp);
      const a = document.createElement("a");
      a.href = webp;
      a.download = `${name}.${mimeType}`;
      a.click();
      resolve(webp);
    };

  convertImageFromFile(
    file: File,
    options: ConvertImageOptions
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          const url: string = <string>reader.result;
          this.convertImageFromUrl(url, options).then(resolve).catch(reject);
        },
        false
      );
      reader.addEventListener("error", reject);
      reader.readAsDataURL(file);
    });
  }
}
