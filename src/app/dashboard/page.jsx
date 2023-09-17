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
import PresupuestoTotal from "@/components/PresupuestoTotal";
import FacturasTabla from "@/components/FacturasTabla";
import GastosTabla from "@/components/GastosTabla";
import AhorrosTabla from "@/components/AhorrosTabla";
import TotalGastos from "@/components/TotalGastos";
import Ahorros from "@/components/Ahorros";
import Graficos from "@/components/Graficos";
import PresupuestoPorAsignar from "@/components/PresupuestoPorAsignar";

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
      <section className="w-full h-auto bg-[#E5F1E8]">
        <div className="container mx-auto w-full h-full px-5 py-20 grid gird-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-5">
          <PresupuestoTotal
            userIsValid={userIsValid}
            totalIngresos={totalIngresos}
            method50_30_20={method50_30_20}
          />

          <PresupuestoPorAsignar />

          <Ahorros />

          <TotalGastos />

          <Graficos />

          <FacturasTabla />

          <GastosTabla />

          <AhorrosTabla />

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
