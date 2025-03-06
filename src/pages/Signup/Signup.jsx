import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import s from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "components/Input/Input";
import { AuthLayout } from "components/layout/AuthLayout/AuthLayout";
import { useState } from "react";
import { AuthAPI } from "api/auth";
import { useDispatch } from "react-redux";
import { setUser } from "store/auth/auth-slice";
import { toast } from "utils/sweet-alert";
export function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast("error", "Password dont match");
      return;
    }
    try {
      const user = await AuthAPI.signup(email, password);
      dispatch(setUser(user));
      await toast("success", "Signed up Successfully, you are now logged in");
      navigate("/");
    } catch (error) {
      toast("error", "Invalid Credentials");
    }
  };
  const form = (
    <div className={s.formContainer}>
      <h2 className={s.title}>
        Signup <br />
        to access your team notes
      </h2>

      <form className={s.formGroup} onSubmit={handleSubmit}>
        <Input onTextChange={setEmail} placeholder={"Email"} />
        <Input
          onTextChange={setPassword}
          placeholder={"password"}
          type="password"
        />
        <Input
          onTextChange={setPassword2}
          placeholder={"confirm password"}
          type="password"
        />
        <ButtonPrimary type="submit" className={s.button}>
          Sign up
        </ButtonPrimary>
        <span>
          You Already have an account ? <Link to="/signin">Signin</Link>
        </span>
      </form>
    </div>
  );
  return <AuthLayout>{form}</AuthLayout>;
}
