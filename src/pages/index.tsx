import Layout from "@/components/layout/Layout";
import Head from "next/head";
import React, { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/libs/store/store";
import { setScene1Loading } from "@/slices/sceneSlice";
import { setLoading } from "@/slices/loadingSlice";
import { ThreeTunnelInput } from "@/components/three/threeTunnel/ThreeTunnelInput";
import Sea from "@/components/three/objects/sea/Sea";

export default function Home() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const scene1Loaded = selector((state: RootState) => state.scene.scene1Loaded); // updated
  const mainSceneLoaded = selector((state: RootState) => state.scene.mainSceneLoaded); // updated

  useEffect(() => {
    // Update the state and start loading the scene for homepage
    dispatch(setScene1Loading(true));
  }, [dispatch]);

  useEffect(() => {
    if (mainSceneLoaded && scene1Loaded) {
      dispatch(setLoading(false));
    }
  }, [scene1Loaded, mainSceneLoaded, dispatch]);

  return (
    <Layout>
      <Head>
        <title>NextJS: Starter Template | Demo Project by Giannis Riganas</title>
        <meta name="description" content="A starter demo app built with Next.js" />
      </Head>
      <div className="relative h-screen"></div>
      {/*<ThreeTunnelInput>*/}
      {/*  <Sea />*/}
      {/*</ThreeTunnelInput>*/}
    </Layout>
  );
}
