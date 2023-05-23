import React from "react";
import dynamic from "next/dynamic";
import { GoogleAnalytics } from "nextjs-google-analytics";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import { store } from "@/libs/store/store";
import fonts from "@/libs/constants/fonts";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import ThreeCanvas from "@/components/three/ThreeCanvas";
import LevaStorePanel from "@/components/three/leva/LevaStorePanel";
const DynamicThreeCanvas = dynamic(() => import("@/components/three/ThreeCanvas"), {
  loading: () => null,
  ssr: false,
});

export default function App({ Component, ...props }) {
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <GoogleAnalytics trackPageViews />
      <div className={`${fonts.primary.variable} ${fonts.secondary.variable} font-primary`}>
        <LoadingScreen />
        <Component {...pageProps} />
        <div className="absolute left-0 top-0 z-1 h-screen w-full">
          <LevaStorePanel />
          <DynamicThreeCanvas />
        </div>
      </div>
    </Provider>
  );
}
