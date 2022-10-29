import { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { AppUIContext } from "../../App";
import { signOut } from "../../store-toolkit/userSlice";
import "./user.scss";

const User = () => {
  const dispatch = useDispatch();
  const { changePageName } = useContext(AppUIContext);
  const logOut = () => {
    dispatch(signOut());
  };
  useEffect(() => {
    changePageName("User");
  }, []);
  return (
    <main>
      <button
        onClick={() => {
          logOut();
        }}
        className="button-logout"
      >
        Log Out
      </button>
    </main>
  );
};

export default User;
