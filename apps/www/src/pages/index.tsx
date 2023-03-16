import type { NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data, isSuccess } = api.subscription.getAll.useQuery();
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-pink-400">T3</span> Turbo
          </h1>
          <p className="text-center text-2xl font-medium">
            {isSuccess ? JSON.stringify(data) : "Loading..."}
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
