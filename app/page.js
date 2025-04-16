'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome to the Weather App</h1>
      <Link href="/weather">
        <button style={{ marginTop: '1rem' }}>Go to Weather Page</button>
      </Link>
    </main>
  );
}
