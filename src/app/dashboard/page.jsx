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
} from "@nextui-org/react";

const Dashboard = () => {
  return (
    <section className="w-full h-auto bg-[#EEF8F0]">
      <div className="container mx-auto w-full h-full px-5 py-20 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-5">
        <div className="bg-white row-span-6 col-span-1 md:col-span-4 lg:col-span-12 shadow rounded">
          Mes
        </div>

        <div className="bg-white h-auto col-span-1 md:col-span-2 lg:col-span-3 shadow rounded">
          <div className="w-full h-full flex flex-col items-start justify-center p-5 gap-5">
            <div className="flex flex-row items-center gap-5">
              <GiReceiveMoney className="bg-green-500 w-10 h-10 p-2 text-white rounded-lg" />

              <div className="flex flex-col items-start">
                <h3 className="font-bold text-xl flex items-center gap-1">
                  Ingresos Totales{" "}
                  <Tooltip content="I am a tooltip">
                    <Button color="primary" isIconOnly variant="light">
                      <AiOutlineQuestionCircle />
                    </Button>
                  </Tooltip>
                </h3>
                <p>$90.000,00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white h-auto col-span-1 md:col-span-2 lg:col-span-3 shadow rounded">
          <div className="w-full h-full flex items-center justify-start p-5 gap-5">
            <div className="flex flex-row items-center gap-5">
              <FaMoneyBillWave className="bg-yellow-500 w-10 h-10 p-2 text-white rounded-lg" />

              <div className="flex flex-col items-start">
                <h3 className="font-bold flex items-center gap-1">
                  Prosupuesto por asignar{" "}
                  <Tooltip content="I am a tooltip">
                    <Button color="warning" isIconOnly variant="light">
                      <AiOutlineQuestionCircle />
                    </Button>
                  </Tooltip>
                </h3>
                <p>$90.000,00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white h-auto col-span-1 md:col-span-2 lg:col-span-3 shadow rounded">
          <div className="w-full h-full flex items-center justify-start p-5 gap-5">
            <div className="flex flex-row items-center gap-5">
              <GiPayMoney className="bg-danger-500 w-10 h-10 p-2 text-white rounded-lg" />

              <div className="flex flex-col items-start">
                <h3 className="font-bold flex items-center gap-1">
                  Suma de Gastos{" "}
                  <Tooltip content="I am a tooltip">
                    <Button color="danger" isIconOnly variant="light">
                      <AiOutlineQuestionCircle />
                    </Button>
                  </Tooltip>
                </h3>
                <p>$90.000,00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white h-auto col-span-1 md:col-span-2 lg:col-span-3 shadow rounded">
          <div className="w-full h-full flex items-center justify-start p-5 gap-5">
            <div className="flex flex-row items-center gap-5">
              <GiTakeMyMoney className="bg-purple-500 w-10 h-10 p-2 text-white rounded-lg" />

              <div className="flex flex-col items-start">
                <h3 className="font-bold flex items-center gap-1">
                  Ahorrado{" "}
                  <Tooltip content="I am a tooltip">
                    <Button color="secondary" isIconOnly variant="light">
                      <AiOutlineQuestionCircle />
                    </Button>
                  </Tooltip>
                </h3>
                <p>$90.000,00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white row-span-6 col-span-1 md:col-span-4 lg:col-span-6 shadow rounded">
          Grafico 01
        </div>

        <div className="bg-white row-span-6 col-span-1 md:col-span-4 lg:col-span-6 shadow rounded">
          Grafico 02
        </div>
        <div className="bg-white row-span-6 col-span-1 md:col-span-4 lg:col-span-12 shadow rounded">
          Table Facturas
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
              <TableRow key="5">
                <TableCell>William Howard</TableCell>
                <TableCell>Community Manager</TableCell>
                <TableCell>Vacation</TableCell>
              </TableRow>
              <TableRow key="6">
                <TableCell>William Howard</TableCell>
                <TableCell>Community Manager</TableCell>
                <TableCell>Vacation</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="bg-white row-span-6 col-span-1 md:col-span-4 lg:col-span-12 shadow rounded">
          Table Gastos
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
              <TableRow key="5">
                <TableCell>William Howard</TableCell>
                <TableCell>Community Manager</TableCell>
                <TableCell>Vacation</TableCell>
              </TableRow>
              <TableRow key="6">
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
