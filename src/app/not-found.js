import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center font-barlow">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        The page you&rsquo;re looking for doesn&rsquo;t exist.
      </p>
      <Link
        href="/"
        className="bg-primary text-white py-3 px-6 rounded-md font-medium hover:opacity-90 transition-opacity"
      >
        Back to Home
      </Link>
    </main>
  );
}
