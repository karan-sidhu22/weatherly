"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center bg-cover bg-center px-4"
      style={{
        backgroundImage: `url('/wea1.jpg')`,
      }}
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-lg">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          Welcome to WeatherSphere
        </h1>
        <Link href="/weather">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
            Go to Weather Page
          </button>
        </Link>
      </div>
    </main>
  );
}
