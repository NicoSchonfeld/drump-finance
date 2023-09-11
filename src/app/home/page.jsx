"use client";

import React from "react";
import Image from "next/image";
import line from "@/assets/line.png";
import { Button } from "@nextui-org/react";

const HomePage = () => {
  return (
    <>
      <main className="w-full h-screen bg-[#EEF8F0]">
        <div className="container mx-auto w-full h-full px-5 flex items-start justify-center flex-col">
          <div className="flex items-start flex-col gap-5">
            <h1 className="text-[#182019] font-bold text-5xl z-[2]">
              Mantenga el{" "}
              <span className="relative text-green-500 overflow-hidden ">
                {" "}
                <Image
                  src={line}
                  width={300}
                  height={300}
                  className="absolute top-0 left-0 -z-[1]"
                />
                control total
              </span>{" "}
              de <br /> sus finanzas.
            </h1>

            <p className="text-[#70907A]">
              En poco tiempo, podrás personalizar tu presupuesto y <br />{" "}
              empezar a ver resultados inmediatos.
            </p>
            <div className="flex items-center justify-center gap-5">
              <Button color="primary" radius="sm">
                Empezár
              </Button>
              <Button color="primary" radius="sm" variant="bordered">
                Cómo usar
              </Button>
            </div>
          </div>
        </div>
      </main>

      <section className="w-full h-screen bg-[#E5F1E8]">
        <div className="container mx-auto w-full h-full px-5 flex items-center justify-start flex-col">
          <div className="flex items-center flex-col gap-5 mt-20">
            <h1 className="text-[#182019] font-bold text-5xl z-[2]">
              50-30-20
            </h1>

            <p className="text-[#70907A] text-center">
              Drump Finance utiliza la{" "}
              <span className="text-green-500">metodología 50-30-20</span>.{" "}
              <br /> Podrás manejar tus finanzas de forma sencilla y organizada,
              dividiendo <br /> tus ingresos de acuerdo a tres categorias clave:
              Necesidades, deseo y ahorro.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
