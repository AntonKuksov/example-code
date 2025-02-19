import { Button, Checkbox, Input, Link } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { tokenAtom, userAtom } from "../../../atoms.ts";
import { login } from "../../../services/auth.ts";

export default function Login() {
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
    const remember = formData.target.remember.value;

    login(username, password, remember).then((response: any) => {
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      navigate("/");
    });
  }

  return (
    <>
      <h1 className="text-center font-semibold text-default-800">Log in</h1>

      <p className="my-4 text-center">
        Do not have an account?{" "}
        <Link
          href="/src/components/user/pages/Signup"
          className="text-primary-700"
        >
          Sign up!
        </Link>
      </p>

      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-6 w-80 justify-center mx-auto"
      >
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
          <Link href="#" className="text-primary-700">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          color="primary"
          className="text-primary-700 font-semibold"
          variant="flat"
        >
          Log in
        </Button>
      </form>
    </>
  );
}
