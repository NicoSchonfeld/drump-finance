import {
  addAhorros,
  addGastos,
  deleteAhorros,
  pb,
  updateAhorros,
} from "@/base/db/pocketbase";
import { formatNumber } from "@/base/formatNumber";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { SlOptionsVertical } from "react-icons/sl";

const AhorrosTabla = ({
  tipos,
  categorias,
  tablaAhorros,
  totalAhorros,
  presupuestoPorAsignar,
  userIsValid,
}) => {
  const [ahorrosScheme, setAhorrosScheme] = React.useState({
    ahorros: "",
    presupuesto: 0,
    tipos: "",
    categorias: "",
    idUser: pb?.authStore?.model?.id,
  });
  const [editState, setEditState] = useState(false);
  const [idUpdateScheme, setIdUpdateScheme] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAhorrosScheme({ ...ahorrosScheme, [name]: value });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (
      ahorrosScheme.ahorros !== "" &&
      ahorrosScheme.presupuesto > 0 &&
      ahorrosScheme.tipos !== "" &&
      ahorrosScheme.categorias !== ""
    ) {
      addAhorros(ahorrosScheme);
      location.reload("/dashboard");
      setAhorrosScheme({
        ahorros: "",
        presupuesto: 0,
        tipos: "",
        categorias: "",
        idUser: pb?.authStore?.model?.id,
      });
    } else {
      console.log("LLenar campos");
    }
  };

  const updateScheme = (dato, id) => {
    setAhorrosScheme({
      ahorros: dato?.ahorros,
      presupuesto: dato?.presupuesto,
      tipos: dato?.tipos,
      categorias: dato?.categorias,
      idUser: pb?.authStore?.model?.id,
    });
    setIdUpdateScheme(id);
  };

  const handleSubmitUpdate = (e) => {
    e?.preventDefault();

    if (
      ahorrosScheme?.ahorros !== "" &&
      ahorrosScheme?.presupuesto > 0 &&
      ahorrosScheme?.tipos !== "" &&
      ahorrosScheme?.categorias !== ""
    ) {
      updateAhorros(idUpdateScheme, ahorrosScheme);
      location.reload("/dashboard");
      setAhorrosScheme({
        ahorros: "",
        presupuesto: 0,
        tipos: "",
        categorias: "",
        idUser: pb?.authStore?.model?.id,
      });
    } else {
      console.log("llenar campos");
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
      <div className="col-span-1 lg:col-span-12 text-[#202b21] bg-white overflow-hidden shadow-md rounded-md">
        <div className="px-5 py-10 space-y-10">
          <div>
            <Skeleton
              className="rounded w-40 bg-[#bfd1c0]"
              isLoaded={userIsValid}
            >
              <h3 className="text-2xl font-bold">Ahorros</h3>
            </Skeleton>

            <Skeleton
              className="rounded w-80 mt-2 bg-[#bfd1c0]"
              isLoaded={userIsValid}
            >
              <p className="text-sm text-[#70907A]">Añade tus Ahorros</p>
            </Skeleton>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5 w-full">
            <form className="flex flex-col lg:flex-row items-start lg:items-center gap-5 w-full">
              <Skeleton
                className="rounded w-full bg-[#bfd1c0]"
                isLoaded={userIsValid}
              >
                <Input
                  type="text"
                  label="Ahorros"
                  name="ahorros"
                  value={ahorrosScheme.ahorros}
                  placeholder="Ingrese su factura"
                  className="text-black"
                  size="sm"
                  onChange={handleChange}
                />
              </Skeleton>

              <Skeleton
                className="rounded w-full bg-[#bfd1c0]"
                isLoaded={userIsValid}
              >
                <Input
                  type="number"
                  label="Presupuesto"
                  name="presupuesto"
                  value={ahorrosScheme.presupuesto}
                  placeholder="Ingrese su presupuesto"
                  className="text-black"
                  size="sm"
                  onChange={handleChange}
                />
              </Skeleton>

              <Skeleton
                className="rounded w-full bg-[#bfd1c0]"
                isLoaded={userIsValid}
              >
                <Select
                  label="Tipo"
                  placeholder="Seleccione su tipo de factura"
                  className="w-full lg:max-w-xs text-black"
                  name="tipos"
                  value={ahorrosScheme.tipos}
                  size="sm"
                  onChange={handleChange}
                >
                  {tipos?.map((dato) => (
                    <SelectItem
                      key={dato.id}
                      value={dato.value}
                      color="primary"
                    >
                      {dato.title}
                    </SelectItem>
                  ))}
                </Select>
              </Skeleton>

              <Skeleton
                className="rounded w-full bg-[#bfd1c0]"
                isLoaded={userIsValid}
              >
                <Select
                  label="Categoria"
                  placeholder="Seleccione su categoria de factura"
                  className="w-full lg:max-w-xs text-black"
                  name="categorias"
                  value={ahorrosScheme.categorias}
                  size="sm"
                  onChange={handleChange}
                >
                  {categorias?.map((dato) => (
                    <SelectItem
                      key={dato.id}
                      value={dato.value}
                      color="primary"
                    >
                      {dato.title}
                    </SelectItem>
                  ))}
                </Select>
              </Skeleton>
            </form>

            <Skeleton
              className="rounded w-auto px-1 bg-[#bfd1c0]"
              isLoaded={userIsValid}
            >
              {presupuestoPorAsignar <= 0 ? (
                <>
                  {editState ? (
                    <div className="flex items-center gap-2 px-2">
                      <Button
                        onClick={() => handleSubmitUpdate()}
                        type="button"
                        color="primary"
                        variant="solid"
                        isIconOnly
                        size="lg"
                        radius="sm"
                      >
                        <AiOutlineEdit />
                      </Button>

                      <Button
                        onClick={() => {
                          setAhorrosScheme({
                            ahorros: "",
                            presupuesto: 0,
                            tipos: "",
                            categorias: "",
                            idUser: pb?.authStore?.model?.id,
                          });
                          setEditState(false);
                          setIdUpdateScheme("");
                        }}
                        type="button"
                        color="danger"
                        variant="solid"
                        isIconOnly
                        size="lg"
                        radius="sm"
                      >
                        <AiOutlineClose />
                      </Button>
                    </div>
                  ) : (
                    <Tooltip content="No tienes presupuesto suficiente para asignar">
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
                    </Tooltip>
                  )}
                </>
              ) : (
                <>
                  {editState ? (
                    <div className="flex items-center gap-2 px-2">
                      <Button
                        onClick={() => handleSubmitUpdate()}
                        type="button"
                        color="primary"
                        variant="solid"
                        isIconOnly
                        size="lg"
                        radius="sm"
                      >
                        <AiOutlineEdit />
                      </Button>

                      <Button
                        onClick={() => {
                          setAhorrosScheme({
                            ahorros: "",
                            presupuesto: 0,
                            tipos: "",
                            categorias: "",
                            idUser: pb?.authStore?.model?.id,
                          });
                          setEditState(false);
                          setIdUpdateScheme("");
                        }}
                        type="button"
                        color="danger"
                        variant="solid"
                        isIconOnly
                        size="lg"
                        radius="sm"
                      >
                        <AiOutlineClose />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleSubmit()}
                      type="button"
                      color="primary"
                      variant="solid"
                      isIconOnly
                      size="lg"
                      radius="sm"
                    >
                      +
                    </Button>
                  )}
                </>
              )}
            </Skeleton>
          </div>

          <Skeleton
            className="rounded w-auto bg-[#bfd1c0]"
            isLoaded={userIsValid}
          >
            <Table
              isHeaderSticky
              removeWrapper
              aria-label="Tabla de ingresos resientes"
              className={
                tablaAhorros?.length > 0
                  ? "w-full h-[300px] overflow-auto"
                  : "w-full h-auto overflow-auto"
              }
            >
              <TableHeader>
                <TableColumn>Ahorros</TableColumn>
                <TableColumn>Presupuesto</TableColumn>
                <TableColumn>Tipo</TableColumn>
                <TableColumn>Categorias</TableColumn>
                <TableColumn>Acciones</TableColumn>
              </TableHeader>
              <TableBody emptyContent={"No has añadido Ahorros."}>
                {tablaAhorros
                  ?.map((dato) => (
                    <TableRow key={dato?.id}>
                      <TableCell className="text-[#202b21]">
                        {dato?.ahorros}
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
                      <TableCell className="text-[#202b21]">
                        <Dropdown placement="left">
                          <DropdownTrigger>
                            <Button variant="light" isIconOnly>
                              <SlOptionsVertical className="text-gray-800" />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            aria-label="Static Actions"
                            color="primary"
                          >
                            <DropdownItem
                              key="Editar"
                              onClick={() => {
                                updateScheme(dato, dato?.id);
                                setEditState(true);
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <AiOutlineEdit /> Editar
                              </div>
                            </DropdownItem>
                            <DropdownItem
                              key="Eliminar"
                              className="text-danger"
                              color="danger"
                              onClick={() => {
                                deleteAhorros(dato);
                                location.reload("/dashboard");
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <AiOutlineDelete />
                                Eliminar
                              </div>
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </TableCell>
                    </TableRow>
                  ))
                  .reverse()}
              </TableBody>
            </Table>
          </Skeleton>

          <Skeleton
            className="rounded w-40 bg-[#bfd1c0]"
            isLoaded={userIsValid}
          >
            <div className="w-full px-2 py-2.5 flex items-center justify-start">
              <p className="font-bold text-xl">
                Total:{" "}
                <span className="font-normal">
                  ${formatNumber(totalAhorros)}
                </span>
              </p>
            </div>
          </Skeleton>
        </div>
      </div>
    </>
  );
};

export default AhorrosTabla;
