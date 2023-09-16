"use client";

import React from "react";
import { Input } from "@nextui-org/input";
import { EyeSlashFilledIcon } from "../../../assets/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../../assets/EyeFilledIcon";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { signIn } from "@/base/db/pocketbase";

const Login = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [userSignInScheme, setUserSignInScheme] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserSignInScheme({ ...userSignInScheme, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    signIn(userSignInScheme).then((res) => {
      setUserSignInScheme({
        email: "",
        password: "",
      });
      location.replace("/");
      toggleVisibility();
    });
  };

  return (
    <section className="w-full h-screen bg-[#E5F1E8]">
      <div className="container mx-auto w-full h-full px-5 flex items-center justify-center flex-col">
        <div className="bg-white w-96 h-auto p-10 flex items-center justify-center flex-col gap-5 rounded-lg shadow">
          <h2 className="font-bold text-2xl">Iniciar sesion</h2>
          <p className="text-center text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
            ipsum.
          </p>

          <form
            className="flex items-center justify-center flex-col gap-5"
            onSubmit={handleSubmit}
          >
            <Input
              type="email"
              label="Email"
              isRequired
              name="email"
              value={userSignInScheme.email}
              onChange={handleChange}
            />
            <Input
              label="Contraseña"
              isRequired
              name="password"
              value={userSignInScheme.password}
              onChange={handleChange}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-gray-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-gray-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="max-w-xs"
            />

            <Button className="w-full" color="primary" type="submit">
              Iniciar sesion
            </Button>

            <Divider className="my-1" />

            <p className="text-sm">
              No tienes una cuenta?{" "}
              <Link as={NextLink} href="/auth/signup" color="primary">
                registrate
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
