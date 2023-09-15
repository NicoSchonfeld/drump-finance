"use client";

import React from "react";
import { GiReceiveMoney, GiTakeMyMoney, GiPayMoney } from "react-icons/gi";
import { FaMoneyBillWave } from "react-icons/fa6";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import {
  Button,
  Tooltip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Progress,
  Divider,
} from "@nextui-org/react";
import NextImage from "next/image";
import {
  VictoryArea,
  VictoryChart,
  VictoryClipContainer,
  VictoryPie,
} from "victory";

import ChartGreen from "../../assets/ChartGreen.png";

const Dashboard = () => {
  return (
    <section className="w-full h-auto bg-[#EEF8F0]">
      <div className="container mx-auto w-full h-full px-5 py-20 grid gird-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-5">
        <div className="bg-white row-span-2 col-span-1 md:col-span-4 lg:col-span-3 shadow rounded">
          <div className="w-full h-full flex flex-col items-center justify-center gap-5 px-5 py-10">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="bg-gradient-to-b from-green-600 to-green-400 border border-green-700 shadow-md shadow-green-500/50 p-2 text-white rounded-xl flex items-center justify-center">
                <GiReceiveMoney className="text-3xl" />
              </div>
              <h3 className="font-bold text-xl">Total de ingresos</h3>
              <p className="font-bold text-4xl text-green-500">$90.000,00</p>
              <p className="text-sm text-gray-500 text-center">
                Comparado a los $70.000,00 <br /> del mes pasado
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3">
              <Button color="primary" className="w-full" variant="bordered">
                Ver lista
              </Button>
              <Button color="primary" className="w-full">
                Añadir ingresos
              </Button>
            </div>

            <Divider className="my-4" />

            <VictoryChart>
              <VictoryArea
                groupComponent={
                  <VictoryClipContainer clipPadding={{ top: 5, right: 10 }} />
                }
                style={{
                  data: {
                    stroke: "#c43a31",
                    strokeWidth: 5,
                    fill: "#c43a31",
                    fillOpacity: 0.2,
                    strokeLinecap: "round",
                  },
                }}
                data={[100, 2000, 30, 30, 4559]}
              />
            </VictoryChart>
          </div>
        </div>

        <div className="bg-white row-span-1 col-span-1 md:col-span-4 lg:col-span-3 shadow rounded">
          <div className="relative w-full h-full flex items-center justify-start gap-3 px-5 py-10">
            <div className="bg-gradient-to-b from-yellow-600 to-yellow-400 border border-yellow-700 shadow-md shadow-yellow-500/50 p-2 text-white rounded-xl flex items-center justify-center">
              <FaMoneyBillWave className="text-3xl" />
            </div>

            <div>
              <h3 className="font-bold">Presupuesto por asignar</h3>
              <p className="font-bold text-2xl text-yellow-500">$90.000,00</p>
            </div>
          </div>
        </div>

        <div className="bg-white row-span-1 col-span-1 md:col-span-4 lg:col-span-3 shadow rounded">
          <div className="relative w-full h-full flex items-center justify-start gap-3 px-5 py-10">
            <div className="bg-gradient-to-b from-purple-600 to-purple-400 border border-purple-700 shadow-md shadow-purple-500/50 p-2 text-white rounded-xl flex items-center justify-center">
              <GiTakeMyMoney className="text-3xl" />
            </div>

            <div>
              <h3 className="font-bold ">Ahorros</h3>
              <p className="font-bold text-2xl text-purple-500">$90.000,00</p>
            </div>
          </div>
        </div>

        <div className="bg-white row-span-1 col-span-1 md:col-span-4 lg:col-span-3 shadow rounded">
          <div className="relative w-full h-full flex items-center justify-start gap-3 px-5 py-10">
            <div className="bg-gradient-to-b from-red-600 to-red-400 border border-red-700 shadow-md shadow-red-500/50 p-2 text-white rounded-xl flex items-center justify-center">
              <GiPayMoney className="text-3xl" />
            </div>

            <div>
              <h3 className="font-bold ">Suma de gastos</h3>
              <p className="font-bold text-2xl text-red-500">$90.000,00</p>
            </div>
          </div>
        </div>

        <div className="bg-white col-start-[0] lg:col-start-4 col-span-1 md:col-span-4 lg:col-span-9 shadow rounded">
          <h1>dwiahdawd</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias,
            esse.
          </p>
          <div className="flex flex-col lg:flex-row items-center justify-around px-5 py-10 gap-5">
            <div className="max-w-md">
              <VictoryPie
                data={[103, 20, 30]}
                categories={{ x: ["dogs", "cats", "mice"] }}
                colorScale={["tomato", "orange", "gold"]}
                labels={["pep", "sss", "dads"]}
                animate={{
                  duration: 2000,
                }}
              />
            </div>

            <div className="w-auto lg:w-[600px]">
              <Progress
                label="Necesidades: $45.000,00"
                size="md"
                value={4000}
                maxValue={45000}
                color="primary"
                formatOptions={{ style: "currency", currency: "ARS" }}
                showValueLabel={true}
                className="w-full"
              />
              <Progress
                label="Deseos: $28.000,00"
                size="md"
                value={3300}
                maxValue={28000}
                color="warning"
                formatOptions={{ style: "currency", currency: "ARS" }}
                showValueLabel={true}
                className="w-full"
              />
              <Progress
                label="Ahorros: $18.000,00"
                size="md"
                value={8000}
                maxValue={18000}
                color="secondary"
                formatOptions={{ style: "currency", currency: "ARS" }}
                showValueLabel={true}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="bg-white col-span-1 md:col-span-4 lg:col-span-6 shadow rounded">
          facturas
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>ROLE</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>Tony Reichert</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>Zoey Lang</TableCell>
                <TableCell>Technical Lead</TableCell>
                <TableCell>Paused</TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>Jane Fisher</TableCell>
                <TableCell>Senior Developer</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell>William Howard</TableCell>
                <TableCell>Community Manager</TableCell>
                <TableCell>Vacation</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="bg-white col-span-1 md:col-span-4 lg:col-span-6 shadow rounded">
          gastos
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>ROLE</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>Tony Reichert</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>Zoey Lang</TableCell>
                <TableCell>Technical Lead</TableCell>
                <TableCell>Paused</TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>Jane Fisher</TableCell>
                <TableCell>Senior Developer</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell>William Howard</TableCell>
                <TableCell>Community Manager</TableCell>
                <TableCell>Vacation</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="bg-white col-span-1 md:col-span-4 lg:col-span-12 shadow rounded">
          ahorros
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>ROLE</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>Tony Reichert</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>Zoey Lang</TableCell>
                <TableCell>Technical Lead</TableCell>
                <TableCell>Paused</TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>Jane Fisher</TableCell>
                <TableCell>Senior Developer</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell>William Howard</TableCell>
                <TableCell>Community Manager</TableCell>
                <TableCell>Vacation</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
