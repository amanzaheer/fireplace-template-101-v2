"use client";

export default function Error({ reset }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center font-barlow">
      <h1 className="text-4xl font-bold text-primary mb-4">
        Something went wrong
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        We encountered an unexpected error. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="bg-primary text-white py-3 px-6 rounded-md font-medium hover:opacity-90 transition-opacity"
      >
        Try Again
      </button>
    </main>
  );
}
