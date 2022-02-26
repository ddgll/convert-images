# ConvertImage

Convert images to another type with typescript support

## Usage

```javascript
import { ConvertImage } from "convert-image";

const converter = new ConvertImage();

const options = {
  name: "random-image",
  download: true,
  width: 400,
  height: 400,
  type: "webp",
};

const file = document.querySelect('input[type="file"]').files[0];

converter
  .convertImageFromUrl("https://i.picsum.photos/id/376/200/300.jpg", options)
  .then((data) => {
    console.log(data);
  });

converter.convertImageFromFile(file, options).then((data) => {
  console.log(data);
});
```

## Functions

### convertImageFromUrl(url, options)

Make sure the url called by convertImageFromUrl has no CORS issue

### convertImageFromFile(file, options)

File is a file given by an input type file (ex: document.querySelect('input[type="file"]').files[0])

## Width & Height

This values let you set width and height value, the image will be scaled due to this values

## Types

Possible types: webp, png, jpeg, gif, bmp
