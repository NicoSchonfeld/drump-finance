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
  Chip,
  Skeleton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import NextImage from "next/image";
import {
  VictoryArea,
  VictoryChart,
  VictoryClipContainer,
  VictoryPie,
} from "victory";
import NextLink from "next/link";

import {
  getTotalMethod50_30_20,
  getTotalRevenue,
  pb,
  isValid,
} from "@/base/db/pocketbase";
import { formatNumber } from "@/base/formatNumber";

const Dashboard = () => {
  const [totalIngresos, setTotalIngresos] = React.useState(0);
  const [method50_30_20, setMethod50_30_20] = React.useState();

  React.useEffect(() => {
    if (pb?.authStore?.isValid) {
      getTotalRevenue().then((res) => {
        if (res[0]) {
          setTotalIngresos(res[0].total);
        } else {
          return;
        }
      });

      getTotalMethod50_30_20().then((res) => {
        if (res[0]) {
          setMethod50_30_20(res[0]);
        } else {
          return;
        }
      });
    }
  }, []);

  const [userIsValid, setUserIsValid] = React.useState(false);

  React.useEffect(() => {
    setUserIsValid(isValid);
  }, [isValid]);

  return (
    <>
      <section className="w-full h-auto bg-[#182019]">
        <div className="container mx-auto w-full h-full px-5 py-20 grid gird-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-5">
          <div className="row-span-4 col-span-3 text-[#E5F1E8] bg-[#202b21] px-5 py-10 shadow-md rounded-md">
            <div className="w-full h-auto flex flex-col items-center gap-3 justify-center">
              <Skeleton
                className="rounded bg-[#678a69] shadow-md shadow-green-500/50"
                isLoaded={userIsValid}
              >
                <div className="bg-gradient-to-b from-green-600 to-green-400 border border-green-700  p-2 text-white rounded flex items-center justify-center">
                  <FaMoneyBillWave className="text-3xl" />
                </div>
              </Skeleton>
              <Skeleton className="rounded bg-[#678a69]" isLoaded={userIsValid}>
                <h3 className="font-bold text-xl">Presupueto total</h3>
              </Skeleton>
              <Skeleton className="rounded bg-[#678a69]" isLoaded={userIsValid}>
                <p className="font-bold text-3xl text-green-500">
                  ${formatNumber(totalIngresos)}
                </p>
              </Skeleton>

              <div className="mt-10 w-full space-y-10">
                <Skeleton
                  className="rounded px-1.5 bg-[#678a69] w-full"
                  isLoaded={userIsValid}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-b from-green-600 to-green-400 border border-green-700  p-2 text-white rounded flex items-center justify-center">
                      <FaMoneyBillWave className="text-xl" />
                    </div>
                    <Progress
                      label={`Necesidades: $${method50_30_20?.total_50?.toFixed(
                        2
                      )}`}
                      size="sm"
                      value={10}
                      maxValue={method50_30_20?.total_50}
                      color="primary"
                      /* formatOptions={{ style: "currency", currency: "ARG" }} */
                      showValueLabel={true}
                      className="max-w-md"
                    />
                  </div>
                </Skeleton>

                <Skeleton
                  className="rounded px-1.5 bg-[#678a69] w-full"
                  isLoaded={userIsValid}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-b from-green-600 to-green-400 border border-green-700  p-2 text-white rounded flex items-center justify-center">
                      <FaMoneyBillWave className="text-xl" />
                    </div>
                    <Progress
                      label={`Deseos: $${method50_30_20?.total_30?.toFixed(2)}`}
                      size="sm"
                      value={4000}
                      maxValue={method50_30_20?.total_30}
                      color="primary"
                      /* formatOptions={{ style: "currency", currency: "ARS" }} */
                      showValueLabel={true}
                      className="max-w-md"
                    />
                  </div>
                </Skeleton>

                <Skeleton
                  className="rounded px-1.5 bg-[#678a69] w-full"
                  isLoaded={userIsValid}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-b from-green-600 to-green-400 border border-green-700  p-2 text-white rounded flex items-center justify-center">
                      <FaMoneyBillWave className="text-xl" />
                    </div>
                    <Progress
                      label={`Ahorros: $${method50_30_20?.total_20?.toFixed(
                        2
                      )}`}
                      size="sm"
                      value={4000}
                      maxValue={method50_30_20?.total_20}
                      color="primary"
                      /* formatOptions={{ style: "currency", currency: "ARS" }} */
                      showValueLabel={true}
                      className="max-w-md"
                    />
                  </div>
                </Skeleton>
              </div>
              <div className="mt-5 w-full flex items-center gap-5">
                <Skeleton
                  className="rounded bg-[#678a69] w-full"
                  isLoaded={userIsValid}
                >
                  <Button
                    radius="sm"
                    color="primary"
                    variant="bordered"
                    className="w-full"
                  >
                    Ver
                  </Button>
                </Skeleton>

                <Skeleton
                  className="rounded bg-[#678a69] w-full"
                  isLoaded={userIsValid}
                >
                  <Button
                    as={NextLink}
                    href="/dashboard/add_revenue"
                    radius="sm"
                    color="primary"
                    variant="solid"
                    className="w-full"
                  >
                    Añadir
                  </Button>
                </Skeleton>
              </div>
            </div>
          </div>

          <div className="col-span-3 text-[#E5F1E8] bg-[#202b21] px-5 py-10 shadow-md rounded-md">
            <div className="bg-gradient-to-b from-green-600 to-green-400 border border-green-700 shadow-md shadow-green-500/50 p-2 text-white rounded flex items-center justify-center">
              <FaMoneyBillWave className="text-3xl" />
            </div>
            <h3>Presupuesto por asignar</h3>
          </div>

          <div className="col-span-3 text-[#E5F1E8] bg-[#202b21] px-5 py-10 shadow-md rounded-md">
            <div className="bg-gradient-to-b from-green-600 to-green-400 border border-green-700 shadow-md shadow-green-500/50 p-2 text-white rounded flex items-center justify-center">
              <FaMoneyBillWave className="text-3xl" />
            </div>
            <h3>Ahorros</h3>
          </div>

          <div className="max-h-[200px] overflow-hidden col-span-3 text-[#E5F1E8] bg-[#202b21] px-5 py-10 shadow-md rounded-md">
            <div className="bg-gradient-to-b from-green-600 to-green-400 border border-green-700 shadow-md shadow-green-500/50 p-2 text-white rounded flex items-center justify-center">
              <FaMoneyBillWave className="text-3xl" />
            </div>
            <h3>Total de gastos</h3>
          </div>

          <div className="row-span-3 col-span-9 text-[#E5F1E8] bg-[#202b21] px-5 py-10 shadow-md rounded-md">
            <div className="bg-gradient-to-b from-green-600 to-green-400 border border-green-700 shadow-md shadow-green-500/50 p-2 text-white rounded flex items-center justify-center">
              <FaMoneyBillWave className="text-3xl" />
            </div>
            <h3>Graficos</h3>
          </div>

          <div className="col-span-12 text-[#E5F1E8] bg-[#202b21] px-5 py-10 shadow-md rounded-md">
            <div className="bg-gradient-to-b from-green-600 to-green-400 border border-green-700 shadow-md shadow-green-500/50 p-2 text-white rounded flex items-center justify-center">
              <FaMoneyBillWave className="text-3xl" />
            </div>
            <h3>facturas</h3>
          </div>

          <div className="col-span-12 text-[#E5F1E8] bg-[#202b21] px-5 py-10 shadow-md rounded-md">
            <div className="bg-gradient-to-b from-green-600 to-green-400 border border-green-700 shadow-md shadow-green-500/50 p-2 text-white rounded flex items-center justify-center">
              <FaMoneyBillWave className="text-3xl" />
            </div>
            <h3>gastos</h3>
          </div>

          <div className="col-span-12 text-[#E5F1E8] bg-[#202b21] px-5 py-10 shadow-md rounded-md">
            <div className="bg-gradient-to-b from-green-600 to-green-400 border border-green-700 shadow-md shadow-green-500/50 p-2 text-white rounded flex items-center justify-center">
              <FaMoneyBillWave className="text-3xl" />
            </div>
            <h3>ahorrros</h3>
          </div>

          <Modal isOpen={!userIsValid}>
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light">
                  Close
                </Button>
                <Button as={NextLink} href="/auth/login" color="primary">
                  Action
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
