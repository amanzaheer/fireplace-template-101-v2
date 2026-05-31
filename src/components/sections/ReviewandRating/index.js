/*
 * ReviewandRating section: multiple designs, one export.
 */ 
import ReviewandRating1 from "./ReviewandRating1";
import ReviewandRating18 from "./ReviewandRating18";

const variants = {
  ReviewandRating1,
  ReviewandRating18,
};

export default function ReviewandRating({ variant, content }) {
      const name = variant ?? "ReviewandRating1";
  const Component = variants[name] ?? ReviewandRating1;
  return <Component content={content} />;
}
      
export { ReviewandRating1,ReviewandRating18,variants };
