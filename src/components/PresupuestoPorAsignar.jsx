import { Button, Tooltip } from "@nextui-org/react";
import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const PresupuestoPorAsignar = () => {
  return (
    <>
      <div className="col-span-3 text-[#202b21] bg-white shadow-md rounded-md">
        <div className="flex flex-col items-center justify-center gap-2 w-full h-full px-5">
          <div className="flex items-center justify-start w-full">
            <p className="text-start text-sm font-bold">
              Presupuesto por asignar:{" "}
              <span className="font-normal">$12,00</span>
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <div className="w-full flex items-center justify-between">
              <h3 className="text-sm text-green-500">Necesidades</h3>
              <Tooltip
                content={
                  <div className="px-1 py-2">
                    <div className="text-small font-bold">Custom Content</div>
                    <div className="text-tiny">
                      This is a custom tooltip content
                    </div>
                  </div>
                }
                placement="bottom"
              >
                <Button isIconOnly size="sm" variant="light" color="primary">
                  <AiOutlineQuestionCircle />
                </Button>
              </Tooltip>
            </div>
            <p className="text-sm">$6.00</p>
          </div>

          <div className="flex flex-col items-start w-full">
            <div className="w-full flex items-center justify-between">
              <h3 className="text-sm text-green-500">Deseos</h3>
              <Tooltip content="Aqui va el 30%" placement="bottom">
                <Button isIconOnly size="sm" variant="light" color="primary">
                  <AiOutlineQuestionCircle />
                </Button>
              </Tooltip>
            </div>
            <p className="text-sm">$3.60</p>
          </div>

          <div className="flex flex-col items-start w-full">
            <div className="w-full flex items-center justify-between">
              <h3 className="text-sm text-green-500">Ahorros</h3>
              <Tooltip content="Aqui va el 20%" placement="bottom">
                <Button isIconOnly size="sm" variant="light" color="primary">
                  <AiOutlineQuestionCircle />
                </Button>
              </Tooltip>
            </div>
            <p className="text-sm">$2.40</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PresupuestoPorAsignar;
