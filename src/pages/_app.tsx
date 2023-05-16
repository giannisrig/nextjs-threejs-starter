import React from "react";
import { GoogleAnalytics } from "nextjs-google-analytics";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import { store } from "@/libs/store/store";
import fonts from "@/libs/constants/fonts";
import ThreeCanvas from "@/components/three/ThreeCanvas";

export default function App({ Component, ...props }) {
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <GoogleAnalytics trackPageViews />
      <div className={`${fonts.primary.variable} ${fonts.secondary.variable} font-primary`}>
        <Component {...pageProps} />
        <div className="absolute left-0 top-0 z-1 h-screen w-full">
          <ThreeCanvas />
        </div>
      </div>
    </Provider>
  );
}
