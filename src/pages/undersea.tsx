import Layout from "@/components/layout/Layout";
import Head from "next/head";
import PageScene from "@/components/three/containers/PageScene";

export default function Undersea() {
  return (
    <Layout>
      <PageScene sceneIndex={3}>
        <Head>
          <title>Undersea | Demo Project by Giannis Riganas</title>
          <meta name="description" content="A starter demo app built with Next.js" />
        </Head>
        <div className="relative h-screen" />
      </PageScene>
    </Layout>
  );
}
