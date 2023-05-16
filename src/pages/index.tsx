import Layout from "@/components/layout/Layout";
import Head from "next/head";
import ThreeCanvas from "@/components/three/ThreeCanvas";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>NextJS: Starter Template | Demo Project by Giannis Riganas</title>
        <meta name="description" content="A starter demo app built with Next.js" />
      </Head>
      <div className="relative h-screen">
        <div className="z-1 absolute left-0 top-0 h-screen w-full">
          <ThreeCanvas />
        </div>
      </div>
    </Layout>
  );
}
