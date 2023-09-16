"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Skeleton,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import NextLink from "next/link";
import { getUser, isValid, logOut, pb } from "@/base/db/pocketbase";

import avatar_1 from "@/assets/avatar_1.png";
import Image from "next/image";

const NavbarComp = ({ path }) => {
  const links = [
    { id: "inicio", Title: "Home", path: "/" },
    { id: "comoUsar", Title: "Cómo usar", path: "/howToUse" },
    { id: "dashboard", Title: "Dashboard", path: "/dashboard" },
    { id: "contactanos", Title: "Contactános", path: "/contactus" },
  ];

  const [userIsValid, setUserIsValid] = React.useState(false);
  const [skeleton, setSkeleton] = React.useState(true);

  React.useEffect(() => {
    setUserIsValid(isValid);
  }, [isValid]);

  React.useEffect(() => {
    setTimeout(() => setSkeleton(false), 1000);
  }, []);

  return (
    <>
      <Navbar
        shouldHideOnScroll
        isBlurred={false}
        maxWidth="2xl"
        className="fixed top-0 left-0 bg-[#202b21]"
      >
        <NavbarBrand>
          <NextLink href="/" className="font-bold text-inherit text-xl">
            <span className="text-[#EEF8F0]">Drump</span>{" "}
            <span className="text-green-500">Finance.</span>
          </NextLink>
          <NavbarContent className="hidden md:flex gap-4 ms-5">
            {links?.map((dato, index) => (
              <NavbarItem
                key={dato.id}
                isActive={path === dato.path ? true : false}
              >
                <Link
                  as={NextLink}
                  color={path === dato.path ? `success` : `secondary`}
                  href={dato.path}
                  size="sm"
                >
                  {dato.Title}
                </Link>
              </NavbarItem>
            ))}
          </NavbarContent>
        </NavbarBrand>

        {userIsValid ? (
          <NavbarContent
            className="hidden md:flex gap-4 items-center"
            justify="end"
          >
            <Dropdown className="bg-[#202b21]">
              <DropdownTrigger>
                <Button variant="light" className="py-6">
                  <div className="flex flex-col items-end justify-center">
                    <p className="leading-3 font-bold text-[#EEF8F0]">
                      {pb?.authStore?.model?.username}
                    </p>
                    <p className="text-[#70907A] text-sm">
                      {pb?.authStore?.model?.email}
                    </p>
                  </div>
                  <Image
                    src={avatar_1}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="profile"
                  className="text-[#EEF8F0]"
                  color="primary"
                >
                  Perfil
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  className="text-[#EEF8F0]"
                  color="primary"
                >
                  Ajustes
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onClick={() => logOut().then((res) => location.replace("/"))}
                >
                  Cerrar sesión
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        ) : (
          <NavbarContent
            className="hidden md:flex gap-4 items-center"
            justify="end"
          >
            <div className="max-w-[200px] w-full flex flex-row-reverse items-center gap-3">
              <div>
                <Skeleton
                  className={
                    skeleton
                      ? "flex rounded-full w-10 h-10 bg-[#678a69]"
                      : "hidden"
                  }
                />
              </div>
              <div className="w-full flex flex-col items-end gap-2">
                <Skeleton
                  className={
                    skeleton ? "h-3 w-3/5 rounded-lg bg-[#678a69]" : "hidden"
                  }
                />
                <Skeleton
                  className={
                    skeleton ? "h-3 w-4/5 rounded-lg bg-[#678a69]" : "hidden"
                  }
                />
              </div>
            </div>
            <Button
              as={NextLink}
              color="primary"
              variant="light"
              radius="sm"
              href="/auth/login"
              className={skeleton ? "hidden" : "visible"}
            >
              Iniciar sesion
            </Button>
            <Button
              as={NextLink}
              color="primary"
              href="/auth/signup"
              radius="sm"
              className={skeleton ? "hidden" : "visible"}
            >
              Registrate
            </Button>
          </NavbarContent>
        )}
      </Navbar>
    </>
  );
};

export default NavbarComp;
