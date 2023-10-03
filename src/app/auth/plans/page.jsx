"use client";

import React from "react";
import NextLink from "next/link";
import { Button, Checkbox, Chip, cn, Input } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";

import detalle1 from "@/assets/detalle1.png";
import Image from "next/image";

const Plans = () => {
  const [isSelected1, setIsSelected1] = React.useState(true);
  const [isSelected2, setIsSelected2] = React.useState(false);

  const descriptionPlanBase = [
    { title: "Metodología 50-30-20." },
    { title: "Acceso a tablas." },
    { title: "Registro a gastos detallado." },
    { title: "Registro todos los meses." },
    { title: "Dashboard de ahorros (3 meses)." },
    { title: "Dashboard Anual (Solo plan 12 meses)." },
  ];

  return (
    <>
      <section className="relative w-full h-auto lg:h-screen bg-[#E5F1E8]">
        <div className="container mx-auto w-full h-full px-5 py-40 lg:py-10 flex flex-col lg:flex-row items-center justify-center gap-20 lg:justify-between">
          <div className="flex flex-col items-start gap-10">
            <h3 className="text-[#182019] font-bold text-xl lg:text-5xl z-[2]">
              Estas pagando el{" "}
              <span className="text-green-500 overflow-hidden ">Plan</span> de{" "}
              <br />{" "}
              <span className="text-green-500 overflow-hidden ">
                1,048.25ARS$/mes.
              </span>
            </h3>

            <ul className="text-[#70907A] text-sm lg:text-base space-y-5">
              {descriptionPlanBase?.map((dato, index) => (
                <li key={index}>- {dato?.title}</li>
              ))}
            </ul>
          </div>

          <div className="w-[300px] md:w-[400px] lg:w-[500px] h-auto px-5 py-10 bg-white overflow-hidden rounded-lg shadow z-[1] flex items-center justify-center flex-col gap-5">
            <div className="flex items-center justify-start w-full">
              <p className="font-bold">
                Revisa los detalles del pago y complétalo.
              </p>
            </div>

            <Checkbox
              aria-label={"checkbox"}
              classNames={{
                base: cn(
                  "inline-flex w-full max-w-md lg:max-w-lg bg-content1 mb-1",
                  "items-center justify-start",
                  "cursor-pointer rounded-lg gap-2 p-4 border-2 ",
                  "data-[selected=true]:border-primary data-[selected=true]:shadow-sm data-[selected=true]:shadow-primary/50"
                ),
                label: "w-full",
              }}
              isSelected={isSelected1}
              onChange={() => {
                setIsSelected1(!isSelected1);
                setIsSelected2(false);
              }}
            >
              <div className="w-full flex justify-between items-center gap-2">
                <span className="text-tiny text-default-500">Base</span>
                <Chip
                  color="success"
                  size="sm"
                  variant={isSelected1 ? "shadow" : "flat"}
                  className={isSelected1 ? "text-white" : ""}
                >
                  1200 ARS$/mes
                </Chip>
              </div>
            </Checkbox>

            <Checkbox
              aria-label={"checkbox"}
              classNames={{
                base: cn(
                  "inline-flex w-full max-w-md lg:max-w-lg bg-content1 mb-1",
                  "items-center justify-start",
                  "cursor-pointer rounded-lg gap-2 p-4 border-2 ",
                  "data-[selected=true]:border-primary data-[selected=true]:shadow-sm data-[selected=true]:shadow-primary/50"
                ),
                label: "w-full",
              }}
              isSelected={isSelected2}
              onChange={() => {
                setIsSelected1(false);
                setIsSelected2(!isSelected2);
              }}
            >
              <div className="w-full flex justify-between items-center gap-2">
                <span className="text-tiny text-default-500">Pro</span>
                <Chip
                  color="success"
                  size="sm"
                  variant={isSelected2 ? "shadow" : "flat"}
                  className={isSelected2 ? "text-white" : ""}
                >
                  27317 ARS$/mes
                </Chip>
              </div>
            </Checkbox>

            <div className="w-full px-5 py-10 bg-[#ebf1ed] rounded-md overflow-hidden">
              <div className="w-full h-full flex items-center flex-col gap-3">
                <p className="w-full flex items-center justify-between">
                  <span className="font-bold">Precio</span>{" "}
                  <span className="text-[#70907A] font-light">$1299</span>
                </p>

                <p className="w-full flex items-center justify-between">
                  <span className="font-bold">Impuestos Mercado Pago</span>{" "}
                  <span className="text-[#70907A] font-light">$1213299</span>
                </p>

                <p className="w-full flex items-center justify-between">
                  <span className="font-bold">Total impuesto</span>{" "}
                  <span className="text-[#70907A] font-light">$1299</span>
                </p>

                <div className="w-full flex flex-col lg:flex-row items-center gap-5 mt-5">
                  <Input
                    type="text"
                    variant="bordered"
                    color="primary"
                    label="¿Tienes un código promocional?"
                    className="bg-white rounded-xl"
                    size="sm"
                  />

                  <Button
                    color="primary"
                    isIconOnly
                    size="lg"
                    className="w-full lg:w-auto"
                  >
                    +
                  </Button>
                </div>
                <p className="w-full flex items-center justify-between text-[12px] text-[#70907A]">
                  <span>Código promocional</span>{" "}
                  <span className="line-through">1,955.47 AR$</span>
                </p>

                <p className="w-full flex items-center justify-between">
                  <span className="font-bold">Total</span>{" "}
                  <span>1,955.47 AR$</span>
                </p>
              </div>
            </div>

            <p className="text-[12px] text-[#70907A] w-full flex items-center justify-start">
              <span>
                La suscripción se renueva en 1,048.25 AR$/mes el 17/10/2023
              </span>
            </p>

            <div className="w-full flex items-center justify-end gap-5">
              <Button color="primary" variant="light" radius="sm">
                Cancelar
              </Button>
              <Button color="primary" variant="solid" radius="sm">
                Comprar
              </Button>
            </div>
          </div>

          <Image
            src={detalle1}
            alt="Detalle para los planes"
            width={1080}
            height={1080}
            className="fixed top-[400px] lg:top-0 right-[50px] lg:right-0"
          />
        </div>
      </section>
    </>
  );
};

export default Plans;
