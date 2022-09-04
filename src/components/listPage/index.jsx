import { useEffect, useContext } from "react";
import { AppContext } from "../../App";

const ListPage = () => {
  const { changePageName } = useContext(AppContext);
  useEffect(() => {
    changePageName("My Shifts");
  });
  return <h1>This is list Page</h1>;
};

export default ListPage;
