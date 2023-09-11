"use client";

import NavbarComp from "@/components/NavbarComp";
import { NextUIProvider } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export function Providers({ children }) {
  const path = usePathname();

  return (
    <NextUIProvider>
      <NavbarComp path={path} />
      {children}
    </NextUIProvider>
  );
}
