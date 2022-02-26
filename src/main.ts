import "./style.css";
import { ConvertImage } from "../lib/ConvertImages";
import { ConvertImageType, ConvertImageOptions } from "../lib/index.d";

const converter = new ConvertImage();

const inputCheckbox: HTMLInputElement | null =
  document.querySelector("input.checkbox");
const inputWidth: HTMLInputElement | null =
  document.querySelector("input.width");
const inputHeight: HTMLInputElement | null =
  document.querySelector("input.height");
const button: HTMLButtonElement | null = document.querySelector("button");
const input: HTMLInputElement | null = document.querySelector("input.file");
const image: HTMLImageElement | null = document.querySelector("img.result");
const typeSelect: HTMLSelectElement | null =
  document.querySelector("select.type");

if (button) {
  button.onclick = () => {
    if (
      !inputCheckbox ||
      !inputWidth ||
      !inputHeight ||
      !input ||
      !image ||
      !typeSelect
    )
      return;
    const type: HTMLOptionElement | null =
      typeSelect.querySelector("option:checked");
    const mimeType: ConvertImageType = <ConvertImageType>(
      (type && type.value && type.value.length ? type.value : "webp")
    );
    const download = inputCheckbox.checked;
    const width = +inputWidth.value || 400;
    const height = +inputHeight.value || 400;
    const options: ConvertImageOptions = {
      download,
      width,
      height,
      type: mimeType,
    };
    if (!input.files || !input.files.length) {
      converter
        .convertImageFromUrl(
          "https://media-cdn.tripadvisor.com/media/photo-s/1a/02/50/bb/troupial-the-national.jpg",
          options
        )
        .then((data: string) => {
          image.src = data;
        });
    } else {
      const file = input.files[0];
      converter.convertImageFromFile(file, options).then((data: string) => {
        image.src = data;
      });
    }
  };
}
