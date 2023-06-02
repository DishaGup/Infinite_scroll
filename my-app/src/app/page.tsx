import { GetServerSideProps } from "next";
import React from "react";

export default function Home({ data =[]}) {
 console.log(data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="border border-red border-2 border-solid w-full h-15 p-5 fixed top-0 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500  text-white text-center text-4xl ">
        Latest Trending Products
      </div>
      <div className="grid grid-cols-3 grid-flow-row gap-4 mt-800 w-full">
        <div className="border border-black border-2 border-solid">ddd</div>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch(
      "https://erin-dizzy-clam.cyclic.app/trendify/products/all?limit=25&page=1"
    );
    const data = await response.json();
console.log(data)
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: null,
      },
    };
  }
}
