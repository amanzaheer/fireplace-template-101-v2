"use client";
import Header1 from './Header1';

const variants = { Header1 };

export default function Header({ variant, content }) {
  const name = variant ?? "Header1";
  const Component = variants[name] ?? Header1;
  return <Component content={content} />;
}
export { Header1 };
