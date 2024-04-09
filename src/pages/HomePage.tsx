import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { removeUser } from "../store/slice/userSlice";
import { resetTicker } from "../store/slice/tickersSlice";
import UserStock from "../components/UserStock/UserStock";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, email } = useAuth();

  const handleLogout = () => {
    dispatch(removeUser());
    dispatch(resetTicker());
    navigate("/login");
  };

  return isAuth ? (
    <section className="flex flex-col justify-center items-center m-1 w-full">
      <section className="flex justify-between w-full">
        <h1 className="text-size22 font-bold">Welcome</h1>
        <button className="base-btn" onClick={handleLogout}>
          Log out from {email}
        </button>
      </section>
      <section className="w-full m-2">
        <Link to="/addstock">
          <button className="base-btn">Add Stock</button>
        </Link>
      </section>
      <section className="flex flex-col justify-center items-center w-full text-center">
        <UserStock />
      </section>
    </section>
  ) : (
    <Navigate to="/register" />
  );
};

export default HomePage;
