import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Manrope } from "next/font/google";
import Head from "next/head";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Audiophile E-commerce</title>
        <meta
          name="description"
          content="An e-commerce website for audio products built with Next.js and TypeScript."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <ConvexProvider client={convex}>
        <div className={manrope.className}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </ConvexProvider>
    </>
  );
}
