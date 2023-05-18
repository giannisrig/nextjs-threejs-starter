import Layout from "@/components/layout/Layout";
import Head from "next/head";
import PageScene from "@/components/three/containers/PageScene";

export default function Test() {
  return (
    <Layout>
      <PageScene sceneIndex={2}>
        <Head>
          <title>Test Page | Demo Project by Giannis Riganas</title>
          <meta name="description" content="A starter demo app built with Next.js" />
        </Head>
        <div className="relative h-screen" />
      </PageScene>
    </Layout>
  );
}
