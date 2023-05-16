import Layout from "@/components/layout/Layout";
import Head from "next/head";
import ThreeCanvas from "@/components/three/ThreeCanvas";
import Box2 from "@/components/three/objects/Box2";
import React, { useEffect } from "react";
import { ThreeTunnel } from "@/components/three/threeTunnel/ThreeTunnel";
import dynamic from "next/dynamic";
import { setScene2 } from "@/slices/sceneSlice";
import { useAppDispatch } from "@/libs/store/store";
const DynamicBox2 = dynamic(() => import("@/components/three/objects/Box2"), {
  loading: () => null,
  ssr: false,
});
export default function Test() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setScene2(true));
  }, [dispatch]);

  return (
    <Layout>
      <Head>
        <title>Test Page | Demo Project by Giannis Riganas</title>
        <meta name="description" content="A starter demo app built with Next.js" />
      </Head>
      <div className="relative h-screen">
        <div className="absolute left-0 top-0 z-1 h-screen w-full">
          <ThreeTunnel>
            <DynamicBox2 />
          </ThreeTunnel>
        </div>
      </div>
    </Layout>
  );
}
