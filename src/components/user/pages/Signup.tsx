import { Button, Checkbox, Input, Link } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { tokenAtom, userAtom } from "../../../atoms.ts";
import { login, signup } from "../../../services/auth.ts";

export default function Signup() {
  const [isVisible, setIsVisible] = useState(false);
  const [t] = useTranslation();
  const setToken = useSetAtom(tokenAtom);
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  function onSubmit(formData: any) {
    formData.preventDefault();
    const username = formData.target.username.value;
    const password = formData.target.password.value;
    const email = formData.target.email.value;
    const remember = formData.target.remember.value;

    signup(username, password, email).then(() => {
      login(username, password, remember).then((response: any) => {
        const { token, user } = response.data;
        setToken(token);
        setUser(user);
        navigate("/");
      });
    });
  }

  return (
    <>
      <h1 className="text-center font-semibold text-default-800">Sign up</h1>

      <p className="my-4 text-center">
        Already have an account?{" "}
        <Link href="/signup" className="text-primary-700">
          Log in!
        </Link>
      </p>

      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-6 w-80 justify-center mx-auto"
      >
        <Input
          name="email"
          type="email"
          label="Email"
          labelPlacement="outside"
          required
        />
        <Input
          name="username"
          type="text"
          label={t("translation:username")}
          labelPlacement="outside"
          required
        />
        <Input
          label={t("translation:password")}
          name="password"
          labelPlacement="outside"
          type={isVisible ? "text" : "password"}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? <FaEye /> : <FaEyeSlash />}
            </button>
          }
          required
        />

        <div className="flex items-center justify-between">
          <Checkbox name="remember">Remember me</Checkbox>
        </div>

        <Button
          type="submit"
          color="primary"
          className="text-primary-700 font-semibold"
          variant="flat"
        >
          Sign up
        </Button>
      </form>
    </>
  );
}
