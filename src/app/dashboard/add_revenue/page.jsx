"use client";
import React, { useEffect, useState } from "react";
import {
  addRevenue,
  pb,
  getRevenueRealtime,
  method50_30_20,
} from "@/base/db/pocketbase";
import {
  Button,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  ScrollShadow,
  Tooltip,
} from "@nextui-org/react";
import { formatNumber } from "@/base/formatNumber";
import NextLink from "next/link";

import { FaArrowLeftLong } from "react-icons/fa6";

const AddRevenue = () => {
  const [ingresosScheme, setIngresosScheme] = React.useState({
    ingresos: "",
    actual: 0,
    idUser: pb?.authStore?.model?.id,
  });
  const [tablaIngresos, setTablaIngresos] = React.useState([]);

  const [totalTablaLocal, setTotalTablaLocal] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setIngresosScheme({ ...ingresosScheme, [name]: value });
  };

  const handleSubmir = (e) => {
    e.preventDefault();

    if (ingresosScheme?.ingresos !== "" && ingresosScheme?.actual > 0) {
      addRevenue(ingresosScheme);
      setTablaIngresos([...tablaIngresos, ingresosScheme]);
      setIngresosScheme({
        ingresos: "",
        actual: 0,
        idUser: pb?.authStore?.model?.id,
      });
    }
  };

  /* bg-[#202b21] */

  return (
    <section className="w-full h-screen bg-[#E5F1E8] py-10">
      <div className="container mx-auto w-full h-full px-5 py-20 flex items-center justify-center gap-5">
        <div className="relative bg-white w-auto p-5 lg:p-20 flex items-start justify-center flex-col lg:flex-row gap-20 rounded-md shadow-lg">
          <div className="w-full flex items-start flex-col gap-5">
            <h1 className="text-3xl mt-10 lg:mt-0 font-bold text-[#202b21]">
              Añadir ingresos
            </h1>
            <p className="text-[#70907A] text-sm max-w-md">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic,
              molestiae!
            </p>

            <form
              onSubmit={handleSubmir}
              className="flex items-center justify-center gap-5 flex-col lg:flex-row w-full mt-5"
            >
              <Input
                type="text"
                label="ingresos"
                placeholder="ingresos"
                isRequired
                name="ingresos"
                size="sm"
                value={ingresosScheme.ingresos}
                onChange={handleChange}
              />

              <Input
                type="number"
                isRequired
                label="Cantidad"
                placeholder="Cantidad"
                name="actual"
                size="sm"
                value={ingresosScheme.actual}
                onChange={handleChange}
              />

              <Button
                isIconOnly
                color="primary"
                type="submit"
                radius="sm"
                size="lg"
              >
                +
              </Button>
            </form>

            <Tooltip content="Volver" placement="right">
              <Button
                as={NextLink}
                href="/dashboard"
                color="primary"
                type="button"
                isIconOnly
                radius="sm"
                size="md"
                variant="light"
                className="absolute top-3 left-5"
              >
                <FaArrowLeftLong className="text-xl" />
              </Button>
            </Tooltip>
          </div>

          <div className="space-y-5 w-full">
            <h3 className="font-bold text-[#202b21]">Ingresos resientes</h3>

            <ScrollShadow className="w-full max-h-[300px]">
              <Table removeWrapper aria-label="Tabla de ingresos resientes">
                <TableHeader>
                  <TableColumn>id</TableColumn>
                  <TableColumn>Ingreosos</TableColumn>
                  <TableColumn>Cantidad</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No has añadido nuevos ingresos."}>
                  {tablaIngresos?.map((dato, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-[#959796]">
                        {index + 1}
                      </TableCell>
                      <TableCell className="text-[#202b21]">
                        {dato?.ingresos}
                      </TableCell>
                      <TableCell className="text-green-500">
                        ${formatNumber(dato?.actual)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollShadow>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddRevenue;
