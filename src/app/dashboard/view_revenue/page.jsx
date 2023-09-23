"use client";
import React, { useEffect, useState } from "react";
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
import {
  deleteRevenue,
  getAllRevenue,
  getTotalRevenue,
  pb,
} from "@/base/db/pocketbase";
import { AiOutlineDelete } from "react-icons/ai";

const ViewRevenue = () => {
  const [tablaIngresos, setTablaIngresos] = useState([]);
  const [totalIngresos, setTotalIngresos] = React.useState(0);

  useEffect(() => {
    if (pb?.authStore?.isValid) {
      getAllRevenue().then((res) => {
        if (res[0]) {
          setTablaIngresos(res);
        } else {
          return;
        }
      });

      getTotalRevenue().then((res) => {
        if (res[0]) {
          setTotalIngresos(res[0].total);
        } else {
          return;
        }
      });
    }
  }, []);

  const eliminarIngresos = (id) => {
    deleteRevenue(id);
    location.reload("/dashboard/view_revenue");
  };

  return (
    <section className="w-full h-auto lg:h-screen bg-[#E5F1E8] py-10">
      <div className="container mx-auto w-full h-full px-5 py-20 flex items-center justify-center gap-5">
        <div className="relative bg-white w-auto p-5 lg:p-20 flex items-start justify-center flex-col gap-10 rounded-md shadow-lg">
          <div>
            <h3 className="text-3xl font-bold text-[#202b21] mb-2">
              Tus ingreos
            </h3>
            <p className="text-[#70907A] text-sm max-w-md">
              Aquí podras ver la lista de tus ingreos reflejada en una tabla
              donde si deceas puedes modificar.
            </p>
          </div>
          <Table
            removeWrapper
            aria-label="Example static collection table"
            bottomContent={
              <p className="font-bold mt-5">
                Total:{" "}
                <span className="font-medium">
                  ${formatNumber(totalIngresos)}
                </span>
              </p>
            }
          >
            <TableHeader>
              <TableColumn>Ingresos</TableColumn>
              <TableColumn>Actual</TableColumn>
              <TableColumn>Eliminar</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No hay ingresos."}>
              {tablaIngresos?.map((dato, index) => (
                <TableRow key={index}>
                  <TableCell>{dato?.ingresos}</TableCell>
                  <TableCell className="text-green-500">
                    ${formatNumber(dato?.actual)}
                  </TableCell>
                  <TableCell>
                    <AiOutlineDelete
                      className="text-red-500 hover:text-red-600 cursor-pointer text-sm md:text-base ms-3"
                      onClick={() => eliminarIngresos(dato)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default ViewRevenue;
