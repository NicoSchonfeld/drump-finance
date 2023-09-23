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
  Tabs,
  Tab,
  Card,
  CardBody,
  ScrollShadow,
  Input,
  SelectItem,
  Select,
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

const PresupuestoTotal = ({
  userIsValid,
  totalIngresos,
  method50_30_20,
  presupuestoPorAsignar,
}) => {
  return (
    <>
      <div className="row-span-4 col-span-3 text-[#202b21] bg-white px-5 py-10 shadow-md rounded-md">
        <div className="w-full h-auto flex flex-col items-center gap-3 justify-center">
          <Skeleton
            className="rounded bg-[#bfd1c0] shadow-md shadow-green-500/50"
            isLoaded={userIsValid}
          >
            <div className="bg-gradient-to-b from-green-600 to-green-400 border border-green-700  p-2 text-white rounded flex items-center justify-center">
              <FaMoneyBillWave className="text-3xl" />
            </div>
          </Skeleton>
          <Skeleton className="rounded bg-[#bfd1c0]" isLoaded={userIsValid}>
            <h3 className="font-bold text-xl">Presupueto total</h3>
          </Skeleton>
          <Skeleton className="rounded bg-[#bfd1c0]" isLoaded={userIsValid}>
            <p className="font-bold text-3xl text-green-500">
              ${formatNumber(totalIngresos)}
            </p>
          </Skeleton>

          <div className="mt-10 w-full space-y-10">
            <Skeleton
              className="rounded px-1.5 bg-[#bfd1c0] w-full"
              isLoaded={userIsValid}
            >
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-b from-green-600 to-green-400 border border-green-700  p-2 text-white rounded flex items-center justify-center">
                  <FaMoneyBillWave className="text-xl" />
                </div>
                <Progress
                  label={`Necesidades: $${method50_30_20?.total_50 ?? 0}`}
                  size="sm"
                  value={presupuestoPorAsignar /* * 0.5 */}
                  maxValue={method50_30_20?.total_50}
                  color="primary"
                  /* formatOptions={{ style: "currency", currency: "ARG" }} */
                  showValueLabel={true}
                  className="max-w-md"
                />
              </div>
            </Skeleton>

            <Skeleton
              className="rounded px-1.5 bg-[#bfd1c0] w-full"
              isLoaded={userIsValid}
            >
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-b from-green-600 to-green-400 border border-green-700  p-2 text-white rounded flex items-center justify-center">
                  <FaMoneyBillWave className="text-xl" />
                </div>
                <Progress
                  label={`Deseos: $${
                    method50_30_20?.total_30?.toFixed(2) ?? 0
                  }`}
                  size="sm"
                  value={presupuestoPorAsignar /* * 0.3 */}
                  maxValue={method50_30_20?.total_30}
                  color="primary"
                  /* formatOptions={{ style: "currency", currency: "ARS" }} */
                  showValueLabel={true}
                  className="max-w-md"
                />
              </div>
            </Skeleton>

            <Skeleton
              className="rounded px-1.5 bg-[#bfd1c0] w-full"
              isLoaded={userIsValid}
            >
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-b from-green-600 to-green-400 border border-green-700  p-2 text-white rounded flex items-center justify-center">
                  <FaMoneyBillWave className="text-xl" />
                </div>
                <Progress
                  label={`Ahorros: $${
                    method50_30_20?.total_20?.toFixed(2) ?? 0
                  }`}
                  size="sm"
                  value={presupuestoPorAsignar /* * 0.2 */}
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
              className="rounded bg-[#bfd1c0] w-full"
              isLoaded={userIsValid}
            >
              <Button
                as={NextLink}
                href="/dashboard/view_revenue"
                radius="sm"
                color="primary"
                variant="bordered"
                className="w-full"
              >
                Ver
              </Button>
            </Skeleton>

            <Skeleton
              className="rounded bg-[#bfd1c0] w-full"
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
    </>
  );
};

export default PresupuestoTotal;
