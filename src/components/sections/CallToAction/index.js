
import CallToAction1 from './CallToAction1';

const variants = {
  CallToAction1,
};

export default function CallToAction({ variant, content }) {
  const name = String(variant ?? '').trim() || 'CallToAction1';
  const Component = variants[name] ?? CallToAction1;
  return <Component content={content} />;
}
export {CallToAction1, variants };
