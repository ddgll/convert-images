var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _canvas, _ctx, _getScale, _imageOnLoad;
var ConvertImageType = /* @__PURE__ */ ((ConvertImageType2) => {
  ConvertImageType2["Webp"] = "webp";
  ConvertImageType2["Png"] = "png";
  ConvertImageType2["Jpeg"] = "jpeg";
  ConvertImageType2["Gif"] = "gif";
  ConvertImageType2["Bmp"] = "bmp";
  return ConvertImageType2;
})(ConvertImageType || {});
class ConvertImage {
  constructor() {
    __privateAdd(this, _canvas, void 0);
    __privateAdd(this, _ctx, void 0);
    __privateAdd(this, _getScale, (width, height, maxWidth, maxHeight) => {
      if (!maxWidth && !maxHeight)
        return 1;
      const sw = (maxWidth || maxHeight || 400) / width;
      const sh = (maxHeight || maxWidth || 400) / height;
      return sw > sh ? sh : sw;
    });
    __privateAdd(this, _imageOnLoad, (image, options, resolve) => () => {
      if (!__privateGet(this, _ctx))
        return;
      const mimeType = options && options.type ? options.type : ConvertImageType.Webp;
      const name = options && options.name ? options.name : "image";
      const scale = __privateGet(this, _getScale).call(this, image.width, image.height, options ? options.width : null, options ? options.height : null);
      __privateGet(this, _canvas).width = image.width * scale;
      __privateGet(this, _canvas).height = image.height * scale;
      __privateGet(this, _ctx).drawImage(image, 0, 0, __privateGet(this, _canvas).width, __privateGet(this, _canvas).height);
      const webp = __privateGet(this, _canvas).toDataURL(`image/${mimeType}`);
      if (!options || !options.download)
        return resolve(webp);
      const a = document.createElement("a");
      a.href = webp;
      a.download = `${name}.${mimeType}`;
      a.click();
      resolve(webp);
    });
    __privateSet(this, _canvas, document.createElement("canvas"));
    __privateSet(this, _ctx, __privateGet(this, _canvas).getContext("2d"));
    document.body.append(__privateGet(this, _canvas));
  }
  convertImageFromUrl(url, options) {
    if (!url)
      return Promise.reject("No Url");
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.addEventListener("load", __privateGet(this, _imageOnLoad).call(this, image, options || {}, resolve).bind(this));
      image.addEventListener("error", reject);
      image.src = url;
    });
  }
  convertImageFromFile(file, options) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const url = reader.result;
        this.convertImageFromUrl(url, options).then(resolve).catch(reject);
      }, false);
      reader.addEventListener("error", reject);
      reader.readAsDataURL(file);
    });
  }
}
_canvas = new WeakMap();
_ctx = new WeakMap();
_getScale = new WeakMap();
_imageOnLoad = new WeakMap();
export { ConvertImage };
