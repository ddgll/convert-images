import "./style.css";
import { ImgToWebp, ImgToWebpOptions } from "../lib/ImgToWebp";

const converter = new ImgToWebp();

const inputCheckbox: HTMLInputElement | null =
  document.querySelector("input.checkbox");
const inputWidth: HTMLInputElement | null =
  document.querySelector("input.width");
const inputHeight: HTMLInputElement | null =
  document.querySelector("input.height");
const button: HTMLButtonElement | null = document.querySelector("button");
const input: HTMLInputElement | null = document.querySelector("input.file");
const image: HTMLImageElement | null = document.querySelector("img.result");

if (button) {
  button.onclick = () => {
    if (!inputCheckbox || !inputWidth || !inputHeight || !input || !image)
      return;
    const download = inputCheckbox.checked;
    const width = +inputWidth.value || 400;
    const height = +inputHeight.value || 400;
    const options: ImgToWebpOptions = {
      download,
      width,
      height,
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
