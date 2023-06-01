import localFont from "next/font/local";
import { Unna } from "next/font/google";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

interface AppFonts {
  primary: NextFontWithVariable;
  secondary: NextFontWithVariable;
}

//load the Google fonts
const unna = Unna({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-primary",
});

//load the local fonts
const drallen = localFont({
  src: [
    {
      path: "../../../public/fonts/Drallen.woff",
    },
  ],
  variable: "--font-secondary",
});

//define the fonts object
const fonts: AppFonts = {
  primary: unna,
  secondary: drallen,
};

export default fonts;
