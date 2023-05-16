import Layout from "@/components/layout/Layout";
import Head from "next/head";
import ThreeCanvas from "@/components/three/ThreeCanvas";
import Box from "@/components/three/objects/Box";
import Box2 from "@/components/three/objects/Box2";
import React from "react";
import { ThreeTunnel } from "@/components/three/threeTunnel/ThreeTunnel";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>NextJS: Starter Template | Demo Project by Giannis Riganas</title>
        <meta name="description" content="A starter demo app built with Next.js" />
      </Head>
      <div className="relative h-screen">
        <div className="absolute left-0 top-0 z-1 h-screen w-full">
          <ThreeTunnel>
            <Box />
          </ThreeTunnel>
        </div>
      </div>
    </Layout>
  );
}
