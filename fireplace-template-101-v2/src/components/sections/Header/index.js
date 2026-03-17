import Header1 from './Header1';

const variants = { Header1 };

export default function Header({ variant }) {
  const name = variant ?? 'Header1';
  const Component = variants[name] ?? Header1;
  return <Component />;
}
export { Header1, variants };
