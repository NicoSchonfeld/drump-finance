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
import { getAllRevenue, pb } from "@/base/db/pocketbase";

const ViewRevenue = () => {
  const [tablaIngresos, setTablaIngresos] = useState([]);

  useEffect(() => {
    if (pb?.authStore?.isValid) {
      getAllRevenue().then((res) => {
        if (res[0]) {
          setTablaIngresos(res);
        } else {
          return;
        }
      });
    }
  }, []);

  return (
    <section className="w-full h-auto lg:h-screen bg-[#E5F1E8] py-10">
      <div className="container mx-auto w-full h-full px-5 py-20 flex items-center justify-center gap-5">
        <div className="relative bg-white w-auto p-5 lg:p-20 flex items-start justify-center flex-col lg:flex-row gap-20 rounded-md shadow-lg">
          {tablaIngresos?.map((dato) => (
            <h2 key={dato.id}>{dato.ingresos}</h2>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ViewRevenue;
