import {
  Button,
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

const AhorrosTabla = () => {
  return (
    <>
      <div className="col-span-12 text-[#202b21] bg-white  shadow-md rounded-md">
        <div className="px-5 py-10 space-y-10">
          <div>
            <h3 className="text-2xl font-bold">Ahorros</h3>
            <p className="text-sm text-[#70907A]">Añade tus Ahorros</p>
          </div>

          <form className="flex items-center gap-5">
            <Input
              type="text"
              label="Email"
              placeholder="Enter your email"
              className="text-black"
              size="sm"
            />
            <Input
              type="text"
              label="Email"
              placeholder="Enter your email"
              className="text-black"
              size="sm"
            />
            <Select
              label="Favorite Animal"
              placeholder="Select an animal"
              className="max-w-xs text-black"
            >
              <SelectItem key="1" value="11">
                11
              </SelectItem>
            </Select>

            <Select
              label="Favorite Animal"
              placeholder="Select an animal"
              className="max-w-xs text-black"
            >
              <SelectItem key="1" value="11">
                11
              </SelectItem>
            </Select>

            <Button
              type="button"
              color="primary"
              variant="solid"
              isIconOnly
              size="lg"
              radius="sm"
            >
              +
            </Button>
          </form>

          <Table
            isHeaderSticky
            removeWrapper
            aria-label="Tabla de ingresos resientes"
            className="w-full h-auto mx-h-[300px]"
          >
            <TableHeader>
              <TableColumn>id</TableColumn>
              <TableColumn>Ingreosos</TableColumn>
              <TableColumn>Cantidad</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No has añadido nuevos ingresos."}>
              {/* <TableRow key="1">
                        <TableCell className="text-[#959796]">1</TableCell>
                        <TableCell className="text-[#E5F1E8]">pepe</TableCell>
                        <TableCell className="text-green-500">$200</TableCell>
                      </TableRow> */}
              {[]}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default AhorrosTabla;
