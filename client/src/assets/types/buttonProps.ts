import { MouseEventHandler } from "react";
import ButtonFontSizes from "../enums/buttonFontSizes";
import ButtonSizes from "../enums/buttonSizes";
import ButtonVariants from "../enums/buttonVariants";
import Logos from "../enums/logos";

interface ButtonProps {
  variant: ButtonVariants;
  size: ButtonSizes;
  text?: string;
  logo?: Logos;
  value?: string;
  key: string;
  handler: MouseEventHandler<HTMLElement | undefined>;
  font?: ButtonFontSizes;
}

export default ButtonProps;
