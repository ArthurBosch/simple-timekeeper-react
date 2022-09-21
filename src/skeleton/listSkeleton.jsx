import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "./helpers.css";

const ListSkeleton = () => {
  return (
    <section className="list-page--container">
      <Skeleton count={10} width={360} height={50} style={{ margin: "1rem" }} />
    </section>
  );
};

export default ListSkeleton;
