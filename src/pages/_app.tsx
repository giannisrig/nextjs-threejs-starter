import React from "react";
import { GoogleAnalytics } from "nextjs-google-analytics";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import { store } from "@/libs/store/store";
import fonts from "@/libs/constants/fonts";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import LevaControls from "@/components/three/containers/LevaControls";
import ThreeCanvas from "@/components/three/ThreeCanvas";
// import dynamic from "next/dynamic";
// const DynamicThreeCanvas = dynamic(() => import("@/components/three/ThreeCanvas"), {
//   loading: () => null,
//   ssr: false,
// });

export default function App({ Component, ...props }) {
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <GoogleAnalytics trackPageViews />
      <div className={`${fonts.primary.variable} ${fonts.secondary.variable} font-primary`}>
        <div className="grain" />
        <LoadingScreen />
        <LevaControls />
        <Component {...pageProps} />
        <div className="fixed left-0 top-0 z-1 h-screen w-full">
          <ThreeCanvas />
        </div>
      </div>
    </Provider>
  );
}
