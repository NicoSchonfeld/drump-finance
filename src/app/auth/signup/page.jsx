"use client";

import React from "react";
import { Input } from "@nextui-org/input";
import { EyeSlashFilledIcon } from "../../../assets/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../../assets/EyeFilledIcon";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { signUp } from "@/base/db/pocketbase";

const SignUp = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [userSignUpScheme, setUserSignUpScheme] = React.useState({
    username: "",
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    suscripcion: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserSignUpScheme({ ...userSignUpScheme, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    signUp(userSignUpScheme).then((res) => {
      setUserSignUpScheme({
        username: "",
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        suscripcion: false,
      });
      location.replace("/auth/login");
      toggleVisibility();
    });
  };

  return (
    <section className="w-full h-screen bg-[#E5F1E8]">
      <div className="container mx-auto w-full h-full px-5 flex items-center justify-center flex-col">
        <div className="bg-white w-96 h-auto p-10 flex items-center justify-center flex-col gap-5 rounded-lg shadow">
          <h2 className="font-bold text-2xl">Registate</h2>
          <p className="text-center text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
            ipsum.
          </p>

          <form
            className="flex items-center justify-center flex-col gap-5"
            onSubmit={handleSubmit}
          >
            <Input
              type="text"
              label="Nombre de usuario"
              isRequired
              value={userSignUpScheme.username}
              name="username"
              onChange={handleChange}
            />

            <Input
              type="text"
              label="Nombre"
              isRequired
              value={userSignUpScheme.name}
              name="name"
              onChange={handleChange}
            />

            <Input
              type="email"
              label="Email"
              isRequired
              value={userSignUpScheme.email}
              name="email"
              onChange={handleChange}
            />
            <Input
              label="Contraseña"
              isRequired
              value={userSignUpScheme.password}
              name="password"
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
            <Input
              label="Repetir contraseña"
              isRequired
              value={userSignUpScheme.passwordConfirm}
              name="passwordConfirm"
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
              Registrarte
            </Button>

            <Divider className="my-1" />

            <p className="text-sm">
              Ya tenes una cuenta?{" "}
              <Link as={NextLink} href="/auth/login" color="primary">
                iniciar sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
