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

// load the local fonts
const spiritedAway = localFont({
  src: [
    {
      path: "../../../public/fonts/SpiritedAway/SpiritedAway.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/SpiritedAway/SpiritedAwayBold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-secondary",
});

//define the fonts object
const fonts: AppFonts = {
  primary: unna,
  secondary: spiritedAway,
};

export default fonts;
