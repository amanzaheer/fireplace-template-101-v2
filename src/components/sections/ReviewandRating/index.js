/*
 * ReviewandRating section: multiple designs, one export.
 */ 
import ReviewandRating1 from "./ReviewandRating1";
import ReviewandRating23 from "./ReviewandRating23";
const variants = {
  ReviewandRating1,
  ReviewandRating23,
  
};

export default function ReviewandRating({ variant, content }) {
      const name = variant ?? "ReviewandRating23";
  const Component = variants[name] ?? ReviewandRating23;
  return <Component content={content} />;
}
      
export { ReviewandRating1,ReviewandRating23,variants };
