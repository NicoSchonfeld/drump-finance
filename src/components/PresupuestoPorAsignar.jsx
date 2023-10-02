import { pb } from "@/base/db/pocketbase";
import { formatNumber } from "@/base/formatNumber";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  Tooltip,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { AiOutlineInfoCircle, AiOutlineQuestionCircle } from "react-icons/ai";
import { FaMoneyBillWave } from "react-icons/fa6";

const PresupuestoPorAsignar = ({ presupuestoPorAsignar, userIsValid }) => {
  const [modalPresupuesto, setModalPresupuesto] = React.useState(false);

  const renderPresupuesto = () => {
    if (presupuestoPorAsignar <= 0) {
      return (
        <span className="text-red-500">
          ${formatNumber(presupuestoPorAsignar.toFixed(2))}
        </span>
      );
    } else {
      return (
        <span className="text-black">
          ${formatNumber(presupuestoPorAsignar.toFixed(2))}
        </span>
      );
    }
  };

  useEffect(() => {
    if (pb?.authStore?.isValid) {
      if (presupuestoPorAsignar <= 0) {
        setModalPresupuesto(true);
      } else {
        setModalPresupuesto(false);
      }
    }
  }, [presupuestoPorAsignar]);

  return (
    <>
      <div className="col-span-1 lg:col-span-3 text-[#202b21] bg-white shadow-md rounded-md py-10">
        <div className="flex flex-col items-center justify-center gap-2 w-full h-full px-5">
          <div className="flex items-center justify-start w-full gap-3 relative">
            <Skeleton
              className="rounded bg-[#bfd1c0] shadow-md shadow-green-500/50"
              isLoaded={userIsValid}
            >
              <div className="bg-gradient-to-b from-green-500 to-green-400 border border-green-600  p-2 text-white rounded flex items-center justify-center">
                <FaMoneyBillWave className="text-2xl" />
              </div>
            </Skeleton>

            <div className="flex flex-col">
              <Skeleton className="rounded bg-[#bfd1c0]" isLoaded={userIsValid}>
                <p className="text-start text-medium font-bold">
                  Presupuesto por asignar:
                </p>
              </Skeleton>

              <Popover>
                <PopoverTrigger>
                  <Button
                    color="primary"
                    variant="light"
                    isIconOnly
                    className="absolute top-0 right-0"
                  >
                    <AiOutlineInfoCircle />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <span>
                    Aquí se muestra el presupuesto que tienes disponible por
                    asignar en las tablas.
                  </span>
                </PopoverContent>
              </Popover>

              <Skeleton
                className="rounded mt-0.5 w-auto bg-[#bfd1c0]"
                isLoaded={userIsValid}
              >
                <span className="font-normal text-base">
                  {renderPresupuesto()}
                </span>
              </Skeleton>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={modalPresupuesto}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            NO hay presupuesto
          </ModalHeader>
          <ModalBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              pulvinar risus non risus hendrerit venenatis. Pellentesque sit
              amet hendrerit risus, sed porttitor quam.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light">
              Close
            </Button>
            <Button color="primary" onClick={() => setModalPresupuesto(false)}>
              Action
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PresupuestoPorAsignar;
