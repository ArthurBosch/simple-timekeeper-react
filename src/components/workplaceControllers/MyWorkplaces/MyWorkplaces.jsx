import { useEffect } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppUIContext } from "../../../App";
import { asyncDeleteWorkplace } from "../../../store-toolkit/userSlice";
import "./myWorkplaces.scss";

const MyWorkplaces = () => {
  const { workplaces } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { changePageName } = useContext(AppUIContext);
  useEffect(() => {
    changePageName("My Workplaces");
    if (workplaces.length === 0) {
      navigate("/");
    }
  }, [workplaces]);

  const handleDelete = (id) => {
    if (
      window.confirm(
        "By deleting the workplace, all shifts on that workplace will be deleted as well. Proceed?"
      )
    ) {
      dispatch(asyncDeleteWorkplace(id));
    }
  };

  const renderWorkplaces = () => {
    return workplaces.map((workplace) => {
      return (
        <li key={workplace.id}>
          <div className="workplace-card">
            <h2>{workplace.name}</h2>
            <div className="card-info">
              <span>{workplace.basewage}</span>
              <span>{workplace.currency}</span>
              <span>{workplace.wagetype}</span>
            </div>
            <div className="card-controls">
              <button>Update</button>
              <button
                id="button-delete"
                onClick={() => {
                  handleDelete(workplace.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      );
    });
  };
  return (
    <main className="myworkplaces-main">
      <div className="myworkplaces-list--container">
        <ul>{renderWorkplaces()}</ul>
      </div>
    </main>
  );
};

export default MyWorkplaces;
