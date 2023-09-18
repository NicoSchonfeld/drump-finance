import { addFacturas, pb } from "@/base/db/pocketbase";
import { formatNumber } from "@/base/formatNumber";
import {
  Button,
  Chip,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

const FacturasTabla = ({
  tipos,
  categorias,
  tablaFacturas,
  totalFacturas,
  presupuestoPorAsignar,
}) => {
  const [facturaScheme, setFacturaScheme] = React.useState({
    facturas: "",
    presupuesto: 0,
    tipos: "",
    categorias: "",
    idUser: pb?.authStore?.model?.id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFacturaScheme({ ...facturaScheme, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      facturaScheme.facturas !== "" &&
      facturaScheme.presupuesto > 0 &&
      facturaScheme.tipos !== "" &&
      facturaScheme.categorias !== ""
    ) {
      addFacturas(facturaScheme);
      location.reload("/dashboard");
      setFacturaScheme({
        facturas: "",
        presupuesto: 0,
        tipos: "",
        categorias: "",
        idUser: pb?.authStore?.model?.id,
      });
    } else {
      console.log("LLenar campos");
    }
  };

  const returnTipos = (tipo) => {
    if (tipo == 1)
      return (
        <Chip variant="dot" color="warning">
          Hogar
        </Chip>
      );
    if (tipo == 2)
      return (
        <Chip variant="dot" color="warning">
          Ocio
        </Chip>
      );
    if (tipo == 3)
      return (
        <Chip variant="dot" color="warning">
          Suscripciones
        </Chip>
      );
    if (tipo == 4)
      return (
        <Chip variant="dot" color="warning">
          Supermercado
        </Chip>
      );
    if (tipo == 5)
      return (
        <Chip variant="dot" color="warning">
          Transporte
        </Chip>
      );
    if (tipo == 6)
      return (
        <Chip variant="dot" color="warning">
          Entretenimiento
        </Chip>
      );
    if (tipo == 7)
      return (
        <Chip variant="dot" color="warning">
          Delivery
        </Chip>
      );
    if (tipo == 8)
      return (
        <Chip variant="dot" color="warning">
          Gym
        </Chip>
      );
    if (tipo == 9)
      return (
        <Chip variant="dot" color="warning">
          Deudas
        </Chip>
      );
    if (tipo == 10)
      return (
        <Chip variant="dot" color="warning">
          Necesidades
        </Chip>
      );
    if (tipo == 11)
      return (
        <Chip variant="dot" color="warning">
          Cuidado Personal
        </Chip>
      );
    if (tipo == 12)
      return (
        <Chip variant="dot" color="warning">
          Otros
        </Chip>
      );
  };

  const returnCategorias = (categoria) => {
    if (categoria == 1)
      return (
        <Chip variant="flat" color="warning">
          Necesidades
        </Chip>
      );
    if (categoria == 2)
      return (
        <Chip variant="flat" color="danger">
          Deseos
        </Chip>
      );
    if (categoria == 3)
      return (
        <Chip variant="flat" color="primary">
          Ahorros
        </Chip>
      );
  };

  return (
    <>
      <div className="col-span-12 text-[#202b21] bg-white  shadow-md rounded-md">
        <div className="px-5 py-10 space-y-10">
          <div>
            <h3 className="text-2xl font-bold">Facturas</h3>
            <p className="text-sm text-[#70907A]">Añade tus facturas</p>
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-5">
            <Input
              type="text"
              label="Facturas"
              name="facturas"
              value={facturaScheme.facturas}
              placeholder="Ingrese su factura"
              className="text-black"
              size="sm"
              onChange={handleChange}
            />
            <Input
              type="number"
              label="Presupuesto"
              name="presupuesto"
              value={facturaScheme.presupuesto}
              placeholder="Ingrese su presupuesto"
              className="text-black"
              size="sm"
              onChange={handleChange}
            />
            <Select
              label="Tipo"
              placeholder="Seleccione su tipo de factura"
              className="max-w-xs text-black"
              name="tipos"
              value={facturaScheme.tipos}
              size="sm"
              onChange={handleChange}
            >
              {tipos?.map((dato) => (
                <SelectItem key={dato.id} value={dato.value} color="primary">
                  {dato.title}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="Categoria"
              placeholder="Seleccione su categoria de factura"
              className="max-w-xs text-black"
              name="categorias"
              value={facturaScheme.categorias}
              size="sm"
              onChange={handleChange}
            >
              {categorias?.map((dato) => (
                <SelectItem key={dato.id} value={dato.value} color="primary">
                  {dato.title}
                </SelectItem>
              ))}
            </Select>

            {presupuestoPorAsignar <= 0 ? (
              <Button
                type="submit"
                color="default"
                variant="solid"
                disabled
                isIconOnly
                size="lg"
                radius="sm"
                className="cursor-not-allowed"
              >
                +
              </Button>
            ) : (
              <Button
                type="submit"
                color="primary"
                variant="solid"
                isIconOnly
                size="lg"
                radius="sm"
              >
                +
              </Button>
            )}
          </form>

          <Table
            isHeaderSticky
            removeWrapper
            aria-label="Tabla de ingresos resientes"
            className={
              tablaFacturas.length > 0
                ? "w-full h-[200px] overflow-auto"
                : "w-full h-auto overflow-auto"
            }
          >
            <TableHeader>
              <TableColumn>Facturas</TableColumn>
              <TableColumn>Presupuesto</TableColumn>
              <TableColumn>Tipo</TableColumn>
              <TableColumn>Categorias</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No has añadido facturas."}>
              {tablaFacturas?.map((dato) => (
                <TableRow key={dato?.id}>
                  <TableCell className="text-[#202b21]">
                    {dato?.facturas}
                  </TableCell>
                  <TableCell className="text-green-500">
                    ${dato?.presupuesto}
                  </TableCell>
                  <TableCell className="text-green-500">
                    {returnTipos(dato?.tipos)}
                  </TableCell>
                  <TableCell className="text-green-500">
                    {returnCategorias(dato?.categorias)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="w-full px-2 py-2.5 flex items-center justify-start">
            <p className="font-bold text-xl">
              Total:{" "}
              <span className="font-normal">
                ${formatNumber(totalFacturas)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FacturasTabla;
