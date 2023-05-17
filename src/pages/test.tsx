import Layout from "@/components/layout/Layout";
import Head from "next/head";
import Scene2 from "@/components/three/appScenes/Scene2";

export default function Test() {
  return (
    <Layout>
      <Head>
        <title>Test Page | Demo Project by Giannis Riganas</title>
        <meta name="description" content="A starter demo app built with Next.js" />
      </Head>
      <div className="relative h-screen" />
      <Scene2 />
    </Layout>
  );
}
