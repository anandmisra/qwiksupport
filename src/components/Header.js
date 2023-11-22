import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/"  style={{color: "Yellow", fontSize: "30px"}}>Qwik</Link>
        <Link to="/"  style={{color: "white", fontSize: "30px"}}>Support</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogout} style={{color: "Yellow"}}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login" style={{color: "Yellow"}}>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register" style={{color: "Yellow"}}>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
