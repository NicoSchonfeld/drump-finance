"use client";

import React, { useState } from "react";
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
  getPresupuestoXAsignar,
  getFacutras,
  getTotalFacutras,
  getTotalGastos,
  getGastos,
  getAhorros,
  getTotalAhorros,
  getDataCategoriaForChart,
} from "@/base/db/pocketbase";
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
  const [presupuestoPorAsignar, setPresupuestoPorAsignar] = React.useState(0);
  const [tablaFacturas, setTablaFacturas] = React.useState([]);
  const [totalFacturas, setTotalFacturas] = React.useState(0);
  const [tablaGastos, setTablaGastos] = React.useState([]);
  const [totalGastos, setTotalGastos] = React.useState(0);
  const [tablaAhorros, setTablaAhorros] = React.useState([]);
  const [totalAhorros, setTotalAhorros] = React.useState(0);
  const [dataCategorias, setDataCategorias] = React.useState();

  const categorias = [
    { id: 1, title: "Necesidades", value: 1 },
    { id: 2, title: "Deseos", value: 2 },
    /* { id: 3, title: "Ahorros", value: 3 }, */
  ];

  const categoriasAhorros = [
    { id: 1, title: "Necesidades", value: 1 },
    { id: 2, title: "Deseos", value: 2 },
    { id: 3, title: "Ahorros", value: 3 },
  ];

  const tipos = [
    { id: 1, title: "Hogar", value: 1 },
    { id: 2, title: "Ocio", value: 2 },
    { id: 3, title: "Suscripciones", value: 3 },
    { id: 4, title: "Supermercado", value: 4 },
    { id: 5, title: "Transporte", value: 5 },
    { id: 6, title: "Entretenimiento", value: 6 },
    { id: 7, title: "Delivery", value: 7 },
    { id: 8, title: "Gym", value: 8 },
    { id: 9, title: "Deudas", value: 9 },
    { id: 10, title: "Necesidades", value: 10 },
    { id: 11, title: "Cuidado Personal", value: 11 },
    { id: 12, title: "Otros", value: 12 },
  ];

  React.useEffect(() => {
    if (pb?.authStore?.isValid) {
      getDataCategoriaForChart().then((res) => {
        setDataCategorias(res);
      });

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

      getPresupuestoXAsignar().then((res) => {
        if (res[0]) {
          setPresupuestoPorAsignar(res[0]?.total);
        } else {
          return;
        }
      });

      getFacutras().then((res) => {
        if (res[0]) {
          setTablaFacturas(res);
        } else {
          return;
        }
      });

      getTotalFacutras().then((res) => {
        if (res[0]) {
          setTotalFacturas(res[0]?.total);
        } else {
          return;
        }
      });

      getGastos().then((res) => {
        if (res[0]) {
          setTablaGastos(res);
        } else {
          return;
        }
      });

      getTotalGastos().then((res) => {
        if (res[0]) {
          setTotalGastos(res[0]?.total);
        } else {
          return;
        }
      });

      getAhorros().then((res) => {
        if (res[0]) {
          setTablaAhorros(res);
        } else {
          return;
        }
      });

      getTotalAhorros().then((res) => {
        if (res[0]) {
          setTotalAhorros(res[0]?.total);
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
        <div className="container mx-auto w-full h-full px-5 py-20 grid gird-cols-1 lg:grid-cols-12 gap-5">
          <PresupuestoTotal
            userIsValid={userIsValid}
            totalIngresos={totalIngresos}
            method50_30_20={method50_30_20}
            presupuestoPorAsignar={presupuestoPorAsignar}
          />

          <PresupuestoPorAsignar
            userIsValid={userIsValid}
            presupuestoPorAsignar={presupuestoPorAsignar}
          />

          <TotalGastos
            userIsValid={userIsValid}
            totalFacturas={totalFacturas}
            totalGastos={totalGastos}
          />

          <Ahorros userIsValid={userIsValid} totalAhorros={totalAhorros} />

          <Graficos
            userIsValid={userIsValid}
            dataCategorias={dataCategorias}
            totalAhorros={totalAhorros}
            totalFacturas={totalFacturas}
            totalGastos={totalGastos}
            tablaFacturas={tablaFacturas}
            tablaGastos={tablaGastos}
            tablaAhorros={tablaAhorros}
          />

          <FacturasTabla
            userIsValid={userIsValid}
            categorias={categorias}
            tipos={tipos}
            tablaFacturas={tablaFacturas}
            totalFacturas={totalFacturas}
            presupuestoPorAsignar={presupuestoPorAsignar}
          />

          <GastosTabla
            userIsValid={userIsValid}
            categorias={categorias}
            tipos={tipos}
            tablaGastos={tablaGastos}
            totalGastos={totalGastos}
            presupuestoPorAsignar={presupuestoPorAsignar}
          />

          <AhorrosTabla
            userIsValid={userIsValid}
            categorias={categoriasAhorros}
            tipos={tipos}
            tablaAhorros={tablaAhorros}
            totalAhorros={totalAhorros}
            presupuestoPorAsignar={presupuestoPorAsignar}
          />

          <Modal isOpen={!userIsValid}>
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
              <ModalBody>
                <p>Login</p>
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
