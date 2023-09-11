"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import NextLink from "next/link";

const NavbarComp = ({ path }) => {
  const links = [
    { id: "inicio", Title: "Home", path: "/" },
    { id: "comoUsar", Title: "Cómo usar", path: "/howToUse" },
    { id: "dashboard", Title: "Dashboard", path: "/dashboard" },
    { id: "contactanos", Title: "Contactános", path: "/contactus" },
  ];

  return (
    <>
      <Navbar
        shouldHideOnScroll
        isBlurred={false}
        maxWidth="2xl"
        className="fixed top-0 left-0"
      >
        <NavbarBrand>
          <NextLink
            href="/"
            className="font-bold text-inherit text-xl text-[#182019]"
          >
            Drump <span className="text-green-500">Finance.</span>
          </NextLink>
          <NavbarContent className="hidden md:flex gap-4 ms-5">
            {links?.map((dato, index) => (
              <NavbarItem
                key={dato.id}
                isActive={path === dato.path ? true : false}
              >
                <Link
                  as={NextLink}
                  color={path === dato.path ? `success` : `foreground`}
                  href={dato.path}
                  size="sm"
                >
                  {dato.Title}
                </Link>
              </NavbarItem>
            ))}
          </NavbarContent>
        </NavbarBrand>

        <NavbarContent className="hidden md:flex gap-4" justify="end">
          <Button
            as={NextLink}
            color="primary"
            href="#"
            variant="light"
            radius="sm"
          >
            Log In
          </Button>
          <Button as={NextLink} color="primary" href="#" radius="sm">
            Sign Up
          </Button>
        </NavbarContent>
      </Navbar>
    </>
  );
};

export default NavbarComp;
