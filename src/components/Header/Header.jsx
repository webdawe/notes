import { Logo } from "components/logo";
import logoSrc from "assets/images/logo.png";
import s from "./style.module.css";
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "store/auth/auth-selectors";
import { AuthAPI } from "api/auth";
import { setUser } from "store/auth/auth-slice";
export function Header() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const signOut = () => {
    AuthAPI.signout();
    dispatch(setUser(null));
  };
  const renderAuthProfile = () => {
    return (
      <div>
        <img
          src={`https://api.dicebear.com/5.x/bottts/svg?seed=${user.email}`}
          alt="user-emolji"
          className="rounded-circle"
          style={{ width: 40 }}
        />
        <div>Hello, {user.email}</div>
        <Link to="#" onClick={signOut}>
          Signout
        </Link>
      </div>
    );
  };

  return (
    <div className={`row ${s.container}`}>
      <div className="col-xs-12 col-sm-4">
        <Logo
          title={"WebdaweKeep"}
          subtitle={"Manage Notes"}
          image={logoSrc}
          onClick={() => navigate("/")}
        />
      </div>
      <div className="col-xs-12 col-sm-8 text-end">{renderAuthProfile()}</div>
    </div>
  );
}
