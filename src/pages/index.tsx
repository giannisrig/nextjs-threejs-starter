import React from "react";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import Scene1 from "@/components/three/appScenes/Scene1";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>NextJS: Starter Template | Demo Project by Giannis Riganas</title>
        <meta name="description" content="A starter demo app built with Next.js" />
      </Head>
      <div className="relative h-screen"></div>
      <Scene1 />
    </Layout>
  );
}
