import React from "react";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import ThreeScene from "@/components/three/containers/ThreeScene";

export default function Home() {
  return (
    <Layout>
      <ThreeScene sceneIndex={1}>
        <Head>
          <title>NextJS: Starter Template | Demo Project by Giannis Riganas</title>
          <meta name="description" content="A starter demo app built with Next.js" />
        </Head>
        <div className="relative h-screen"></div>
        {/* The scene will be lazy loaded to the main threejs canvas */}
      </ThreeScene>
    </Layout>
  );
}
