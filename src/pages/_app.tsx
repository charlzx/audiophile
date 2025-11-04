import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Manrope } from "next/font/google";
import Head from "next/head";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { pageVariants } from "@/utils/animations";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

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
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={router.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Component {...pageProps} />
              </motion.div>
            </AnimatePresence>
          </Layout>
        </div>
      </ConvexProvider>
    </>
  );
}
