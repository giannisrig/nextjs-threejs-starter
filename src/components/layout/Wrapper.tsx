"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/libs/store/store";
import { GoogleAnalytics } from "nextjs-google-analytics";
import fonts from "@/libs/constants/fonts";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import LevaControls from "@/components/three/containers/LevaControls";
import dynamic from "next/dynamic";
const Canvas = dynamic(() => import("@/components/three/ThreeCanvas"), {
  loading: () => null,
  ssr: false,
});
export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <GoogleAnalytics trackPageViews />
      <div className={`${fonts.primary.variable} ${fonts.secondary.variable} font-primary`}>
        <div className="grain" />
        <LoadingScreen />
        <LevaControls />
        {children}
        <div className="absolute left-0 top-0 z-1 h-screen w-full">
          <Canvas />
        </div>
      </div>
    </Provider>
  );
}
