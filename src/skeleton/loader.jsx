import { ClockLoader } from "react-spinners";
import "./helpers.css";

const Loader = () => {
  return (
    <section className="clock-loader-overlay">
      <ClockLoader color="#00b3b3" />
    </section>
  );
};

export default Loader;
