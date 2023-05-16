import Layout from "@/components/layout/Layout";
import Head from "next/head";
import React, { useEffect } from "react";
import { setScene2Loading } from "@/slices/sceneSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/libs/store/store";
import { setLoading } from "@/slices/loadingSlice";

export default function Test() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const scene2Loaded = selector((state: RootState) => state.scene.scene2Loaded); // updated
  const mainSceneLoaded = selector((state: RootState) => state.scene.mainSceneLoaded); // updated

  useEffect(() => {
    dispatch(setScene2Loading(true));
  }, [dispatch]);

  useEffect(() => {
    if (mainSceneLoaded && scene2Loaded) {
      dispatch(setLoading(false));
    }
  }, [scene2Loaded, mainSceneLoaded, dispatch]);

  return (
    <Layout>
      <Head>
        <title>Test Page | Demo Project by Giannis Riganas</title>
        <meta name="description" content="A starter demo app built with Next.js" />
      </Head>
      <div className="relative h-screen" />
    </Layout>
  );
}
