"use client";

import React from "react";
import { Input } from "@nextui-org/input";
import { EyeSlashFilledIcon } from "../../../assets/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../../assets/EyeFilledIcon";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";

const SignUp = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <section className="w-full h-screen bg-[#E5F1E8]">
      <div className="container mx-auto w-full h-full px-5 flex items-center justify-center flex-col">
        <div className="bg-white w-96 h-auto p-10 flex items-center justify-center flex-col gap-5 rounded-lg shadow">
          <h2 className="font-bold text-2xl">Registate</h2>
          <p className="text-center text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
            ipsum.
          </p>

          <form className="flex items-center justify-center flex-col gap-5">
            <Input type="text" label="Nombre de usuario" isRequired />
            <Input type="email" label="Email" isRequired />
            <Input
              label="Contraseña"
              isRequired
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
