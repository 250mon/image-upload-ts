'use client';

import ImageUploader from '../components/ImageUploader';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold text-center mb-8">
        Image Upload Demo
      </h1>
      <ImageUploader />
    </main>
  );
}