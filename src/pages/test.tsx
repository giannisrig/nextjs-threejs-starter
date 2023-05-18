import Layout from "@/components/layout/Layout";
import Head from "next/head";
import ThreeScene from "@/components/three/containers/ThreeScene";

export default function Test() {
  return (
    <Layout>
      <ThreeScene sceneIndex={2}>
        <Head>
          <title>Test Page | Demo Project by Giannis Riganas</title>
          <meta name="description" content="A starter demo app built with Next.js" />
        </Head>
        <div className="relative h-screen" />
      </ThreeScene>
    </Layout>
  );
}
