import React from "react";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import PageScene from "@/components/three/containers/PageScene";

export default function Home() {
  return (
    <Layout>
      <PageScene sceneIndex={1}>
        <Head>
          <title>NextJS: Starter Template | Demo Project by Giannis Riganas</title>
          <meta name="description" content="A starter demo app built with Next.js" />
        </Head>
        <div className="relative flex h-screen items-center justify-center text-center">
          <h1 className="mb-100px w-[1000px] font-secondary text-[80px] leading-[90px] text-black">Creating Memorable Human Experiences</h1>
        </div>

        {/* The scene will be lazy loaded to the main threejs canvas */}
      </PageScene>
    </Layout>
  );
}
