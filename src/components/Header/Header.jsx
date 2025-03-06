import { Logo } from "components/logo";
import logoSrc from "assets/images/logo.png";
import s from "./style.module.css";
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { useNavigate } from "react-router-dom";
export function Header() {
  const navigate = useNavigate();

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
      <div className="col-xs-12 col-sm-8 text-end">
        <ButtonPrimary OnClick={() => navigate("/note/new")}>
          Add Note +
        </ButtonPrimary>
      </div>
    </div>
  );
}
