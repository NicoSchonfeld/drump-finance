import moment from "moment";
import "moment/locale/es";
import PocketBase from "pocketbase";

const formatoDefault = "dddd Do MMMM YYYY"; // ejemplo: jueves 26º octubre 2023
const soloMesFormato = "MMMM";
const soloNumero = "Do";
const soloDia = "dddd";
const soloAño = "YYYY";
const hoy = moment();

const URL = process.env.URL_POCKETBASE_PROD || "http://127.0.0.1:8090";
export const pb = new PocketBase(URL);

export const isValid = pb?.authStore?.isValid;

/* USUARIO */

export const signUp = async (userSignUpScheme) => {
  try {
    const SignUp = await pb.collection("users").create(userSignUpScheme);

    console.log(SignUp);
  } catch (error) {
    console.error(error);
  }
};

export const signIn = async (userSignInScheme) => {
  try {
    const authData = await pb
      .collection("users")
      .authWithPassword(userSignInScheme?.email, userSignInScheme?.password);

    console.log(authData);
  } catch (error) {
    console.log(error);
  }
};

export const logOut = async () => {
  try {
    if (pb.authStore.isValid) {
      pb.authStore.clear();
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async () => {
  try {
    if (pb.authStore.isValid) {
      const user = await pb.collection("users").getOne(pb.authStore.model.id);

      const userAuth = {
        username: user.username,
        email: user.email,
        suscripcion: user?.suscripcion,
      };

      return userAuth;
    }
  } catch (error) {
    console.log(error);
  }
};

/* METODO 50 30 20 */

export const createMethod50_30_20 = async (totalAmount) => {
  try {
    if (pb?.authStore?.isValid) {
      const total_50 = totalAmount * 0.5;
      const total_30 = totalAmount * 0.3;
      const total_20 = totalAmount * 0.2;

      const data = {
        total_50: total_50,
        total_30: total_30,
        total_20: total_20,
        idUser: pb?.authStore?.model?.id,
      };

      const createTotal50_30_20 = await pb
        .collection("metodo_50_30_20")
        .create(data);

      return createTotal50_30_20;
    }
  } catch (error) {
    console.log(error);
  }
};

export const editMethod50_30_20 = async (totalAmount) => {
  try {
    if (pb?.authStore?.isValid) {
      const total_50 = totalAmount > 0 ? totalAmount * 0.5 : 0;
      const total_30 = totalAmount > 0 ? totalAmount * 0.3 : 0;
      const total_20 = totalAmount > 0 ? totalAmount * 0.2 : 0;

      const data = {
        total_50: total_50,
        total_30: total_30,
        total_20: total_20,
        idUser: pb?.authStore?.model?.id,
      };

      const allRecords = await pb.collection("metodo_50_30_20").getFullList({
        sort: "-created",
      });

      const onlyRecosrsAuthUser = allRecords.filter(
        (item) => item?.idUser == pb?.authStore?.model?.id
      );

      const totalEdit = await pb
        .collection("metodo_50_30_20")
        .update(onlyRecosrsAuthUser[0]?.id, data);

      return totalEdit;
    }
  } catch (error) {
    console.log(error);
  }
};

/* PRESUPUESTO POR ASIGNAR */

export const createTotalPresupuestoXAsignar = async (totalAmount) => {
  try {
    if (pb?.authStore?.isValid) {
      const saveTotalPresupuesto = {
        total: totalAmount,
        idUser: pb?.authStore?.model?.id,
      };

      const record = await pb
        .collection("total_presupuesto_por_asignar")
        .create(saveTotalPresupuesto);

      return record;
    }
  } catch (error) {
    console.log(error);
  }
};

export const editTotalPresupuestoXAsignar = async (totalAmount) => {
  try {
    if (pb?.authStore?.isValid) {
      const saveTotalPresupuesto = {
        total: totalAmount,
        idUser: pb?.authStore?.model?.id,
      };

      const records = await pb
        .collection("total_presupuesto_por_asignar")
        .getFullList({
          sort: "-created",
        });

      const onlyAuthUser = records.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      const record = await pb
        .collection("total_presupuesto_por_asignar")
        .update(onlyAuthUser[0]?.id, saveTotalPresupuesto);

      return record;
    }
  } catch (error) {
    console.log(error);
  }
};

/* INGRESOS */

export const totalRevenue = async () => {
  try {
    if (pb?.authStore?.isValid) {
      const resAllRevenue = await pb.collection("ingresos").getFullList({
        sort: "-created",
      });

      const onlyAmount = resAllRevenue.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      const totalAmount = onlyAmount.reduce(
        (acc, item) => (acc += item.actual),
        0
      );

      const saveTotalRevenue = {
        total: totalAmount,
        idUser: pb?.authStore?.model?.id,
      };

      const resSave = await pb
        .collection("total_ingresos")
        .create(saveTotalRevenue);

      createMethod50_30_20(totalAmount);
      createTotalPresupuestoXAsignar(totalAmount);

      return resSave;
    }
  } catch (error) {
    console.log(error);
  }
};

export const editTotalRevenue = async () => {
  try {
    if (pb?.authStore?.isValid) {
      const resAllRevenue = await pb.collection("ingresos").getFullList({
        sort: "-created",
      });

      const onlyAmount = resAllRevenue.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      const totalAmount = onlyAmount.reduce(
        (acc, item) => (acc += item.actual),
        0
      );

      const saveTotalRevenue = {
        total: totalAmount,
        idUser: pb?.authStore?.model?.id,
      };

      const resAllTotal_ingresos = await pb
        .collection("total_ingresos")
        .getFullList({
          sort: "-created",
        });

      const onlyTotalAuthUser = resAllTotal_ingresos.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      const resSave = await pb
        .collection("total_ingresos")
        .update(onlyTotalAuthUser[0].id, saveTotalRevenue);

      editMethod50_30_20(totalAmount);
      editTotalPresupuestoXAsignar(totalAmount);

      return resSave;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteRevenue = async (dato, setInfo) => {
  try {
    if (pb?.authStore?.isValid) {
      /* Restar el ingreso seleccionado con el presupesto */

      const allPResupuetosXAsignar = await pb
        .collection("total_presupuesto_por_asignar")
        .getFullList({
          sort: "-created",
        });

      const [onlyPresupuestoAuthUser] = allPResupuetosXAsignar.filter(
        (item) => item?.idUser == pb?.authStore?.model?.id
      );

      if (onlyPresupuestoAuthUser?.total > 0) {
        const restaPresupuesto = onlyPresupuestoAuthUser?.total - dato?.actual;

        if (restaPresupuesto > 0) {
          const dataUpdatePresupuesto = {
            total: restaPresupuesto,
            idUser: pb?.authStore?.model?.id,
          };

          await pb
            .collection("total_presupuesto_por_asignar")
            .update(onlyPresupuestoAuthUser?.id, dataUpdatePresupuesto);

          /* Eliminar ingresos de la tabla */
          const eliminarIngreso = await pb
            .collection("ingresos")
            .delete(dato?.id);

          /* Restar el ingreso seleccionado del total */
          const allTotalIngresos = await pb
            .collection("total_ingresos")
            .getFullList({
              sort: "-created",
            });

          const [onlyTotalIngresosAuthUser] = allTotalIngresos.filter(
            (item) => item?.idUser == pb?.authStore?.model?.id
          );

          const restaTotalIngresos =
            onlyTotalIngresosAuthUser?.total - dato?.actual;

          const dataTotalIngresos = {
            total: restaTotalIngresos,
            idUser: pb?.authStore?.model?.id,
          };

          const restarTotal = await pb
            .collection("total_ingresos")
            .update(onlyTotalIngresosAuthUser?.id, dataTotalIngresos);

          editMethod50_30_20(dato?.actual);
          location.reload("/dashboard/view_revenue");

          return eliminarIngreso;
        } else {
          if (onlyPresupuestoAuthUser?.total == dato?.actual) {
            /* Eliminar ultimo ingreso de la tabla */
            const eliminarIngreso = await pb
              .collection("ingresos")
              .delete(dato?.id);

            const allPResupuetosXAsignar = await pb
              .collection("total_presupuesto_por_asignar")
              .getFullList({
                sort: "-created",
              });

            const [onlyPresupuestoAuthUser] = allPResupuetosXAsignar.filter(
              (item) => item?.idUser == pb?.authStore?.model?.id
            );

            const restaPresupuesto =
              onlyPresupuestoAuthUser?.total - dato?.actual;

            const dataUpdatePresupuesto = {
              total: restaPresupuesto,
              idUser: pb?.authStore?.model?.id,
            };

            await pb
              .collection("total_presupuesto_por_asignar")
              .update(onlyPresupuestoAuthUser?.id, dataUpdatePresupuesto);

            /* Restar el ingreso seleccionado del total */
            const allTotalIngresos = await pb
              .collection("total_ingresos")
              .getFullList({
                sort: "-created",
              });

            const [onlyTotalIngresosAuthUser] = allTotalIngresos.filter(
              (item) => item?.idUser == pb?.authStore?.model?.id
            );

            const restaTotalIngresos =
              onlyTotalIngresosAuthUser?.total - dato?.actual;

            const dataTotalIngresos = {
              total: restaTotalIngresos,
              idUser: pb?.authStore?.model?.id,
            };

            const restarTotal = await pb
              .collection("total_ingresos")
              .update(onlyTotalIngresosAuthUser?.id, dataTotalIngresos);

            editMethod50_30_20(0);
            location.reload("/dashboard/view_revenue");

            return eliminarIngreso;
          } else {
            setInfo(true);
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const addRevenue = async (ingresosScheme) => {
  try {
    if (pb?.authStore?.isValid) {
      const resAddRevenue = await pb
        .collection("ingresos")
        .create(ingresosScheme);

      const totalIngresos = await pb.collection("total_ingresos").getFullList({
        sort: "-created",
      });

      const onlyIngresosUserAuth = totalIngresos.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      if (onlyIngresosUserAuth.length <= 0) totalRevenue();
      if (onlyIngresosUserAuth.length > 0) editTotalRevenue();

      return resAddRevenue;
    }
  } catch (error) {
    console.log(error);
  }
};

/* FACTURAS */

export const createFacturas = async () => {
  try {
    if (pb?.authStore?.isValid) {
      const allFacturas = await pb.collection("facturas").getFullList({
        sort: "-created",
      });

      const onlyFacAuthUser = allFacturas.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      const totalPresupuestoFacturas = onlyFacAuthUser.reduce(
        (acc, item) => (acc += item?.presupuesto),
        0
      );

      const totalPresupuestoObject = {
        total: totalPresupuestoFacturas,
        idUser: pb?.authStore?.model?.id,
      };

      const totalFacturas = await pb
        .collection("total_facturas")
        .create(totalPresupuestoObject);

      /* Edit presupuesto por asignar */

      const allPResupuetosXAsignar = await pb
        .collection("total_presupuesto_por_asignar")
        .getFullList({
          sort: "-created",
        });

      const onlyPresAuthUser = allPResupuetosXAsignar.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      const resta = onlyPresAuthUser[0]?.total - totalPresupuestoFacturas;

      const data = {
        total: resta,
        idUser: pb?.authStore?.model?.id,
      };

      const savePresupuesto = await pb
        .collection("total_presupuesto_por_asignar")
        .update(onlyPresAuthUser[0]?.id, data);

      return totalFacturas;
    }
  } catch (error) {
    console.log(error);
  }
};

export const editFacturas = async () => {
  try {
    if (pb?.authStore?.isValid) {
      const allFacturas = await pb.collection("facturas").getFullList({
        sort: "-created",
      });

      const onlyFacturasAuthUser = allFacturas.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      const totalFacturas = onlyFacturasAuthUser.reduce(
        (acc, item) => (acc += item.presupuesto),
        0
      );

      const saveTotalRevenue = {
        total: totalFacturas,
        idUser: pb?.authStore?.model?.id,
      };

      const allTotalFacturasGet = await pb
        .collection("total_facturas")
        .getFullList({
          sort: "-created",
        });

      const getOnlyFactAuthUser = allTotalFacturasGet.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      const updateTotalFacturas = await pb
        .collection("total_facturas")
        .update(getOnlyFactAuthUser[0]?.id, saveTotalRevenue);

      /* Edit presupuesto por asignar */

      const allPResupuetosXAsignar = await pb
        .collection("total_presupuesto_por_asignar")
        .getFullList({
          sort: "-created",
        });

      const onlyPresAuthUser = allPResupuetosXAsignar.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      const resta =
        onlyPresAuthUser[0]?.total - onlyFacturasAuthUser[0]?.presupuesto;

      const data = {
        total: resta,
        idUser: pb?.authStore?.model?.id,
      };

      const record = await pb
        .collection("total_presupuesto_por_asignar")
        .update(onlyPresAuthUser[0]?.id, data);

      return updateTotalFacturas;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteFacturas = async (dato) => {
  try {
    if (pb?.authStore?.isValid) {
      /* Actualizar presupuesto por asignar */
      const allPresupuestos = await pb
        .collection("total_presupuesto_por_asignar")
        .getFullList({
          sort: "-created",
        });

      const onlyPresupuestoAuthUser = allPresupuestos.filter(
        (item) => item?.idUser == pb?.authStore?.model?.id
      );

      const sumaDePres = onlyPresupuestoAuthUser[0]?.total + dato?.presupuesto;

      const sumaDePresupuesto = {
        total: sumaDePres,
        idUser: pb?.authStore?.model?.id,
      };

      await pb
        .collection("total_presupuesto_por_asignar")
        .update(onlyPresupuestoAuthUser[0]?.id, sumaDePresupuesto);

      /* Actualizar Total de factura */
      const allTotalFacturas = await pb
        .collection("total_facturas")
        .getFullList({
          sort: "-created",
        });

      const onlyTotalFacAuthUser = allTotalFacturas.filter(
        (item) => item?.idUser == pb?.authStore?.model?.id
      );

      const restaDeTotalFacturas =
        onlyTotalFacAuthUser[0]?.total - dato?.presupuesto;

      const restaDelTotalFac = {
        total: restaDeTotalFacturas,
        idUser: pb?.authStore?.model?.id,
      };

      const saveNewTotalFactura = await pb
        .collection("total_facturas")
        .update(onlyTotalFacAuthUser[0]?.id, restaDelTotalFac);

      /* Eliminar factura */

      const deleteFactura = await pb.collection("facturas").delete(dato?.id);

      return deleteFactura;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateFacturas = async (idFactura, facturasScheme) => {
  try {
    if (pb?.authStore?.isValid) {
      const facturaAnterior = await pb
        .collection("facturas")
        .getOne(idFactura, {
          expand: "relField1,relField2.subRelField",
        });

      /* la nueva factura es mayor a la que estaba anterior */
      if (facturaAnterior?.presupuesto < Number(facturasScheme?.presupuesto)) {
        // Se actualiza la factura con el nuevo presupuesto

        const facturaUpdate = await pb
          .collection("facturas")
          .update(idFactura, facturasScheme);

        const nuevaResta =
          Number(facturasScheme?.presupuesto) - facturaAnterior?.presupuesto; // 7.000 - 5.000 = 2.000

        const totalFacturas = await pb
          .collection("total_facturas")
          .getFullList({
            sort: "-created",
          });

        const onlyTotalFacUserAuth = totalFacturas.filter(
          (item) => item?.idUser == pb?.authStore?.model?.id
        );

        const sumaTotalFacturas = onlyTotalFacUserAuth[0]?.total + nuevaResta;

        const dataSumaTotalFacturas = {
          total: sumaTotalFacturas,
          idUser: pb?.authStore?.model?.id,
        };

        await pb
          .collection("total_facturas")
          .update(onlyTotalFacUserAuth[0]?.id, dataSumaTotalFacturas);

        // El resultado de esta nuevaResta se tiene que sumar al presupuesto por asignar
        const allPresupuestos = await pb
          .collection("total_presupuesto_por_asignar")
          .getFullList({
            sort: "-created",
          });

        const onlyPresupuestoUserAuth = allPresupuestos.filter(
          (item) => item?.idUser == pb?.authStore?.model?.id
        );

        const restaPresupuesto = onlyPresupuestoUserAuth[0]?.total - nuevaResta;

        const dataUpdatePresupuesto = {
          total: restaPresupuesto,
          idUser: pb?.authStore?.model?.id,
        };

        await pb
          .collection("total_presupuesto_por_asignar")
          .update(onlyPresupuestoUserAuth[0]?.id, dataUpdatePresupuesto);

        return facturaUpdate;
      }

      /* la nueva factura es menor a la que estaba anterior */
      if (facturaAnterior?.presupuesto > Number(facturasScheme?.presupuesto)) {
        // Se actualiza la factura con el nuevo presupuesto

        const facturaUpdate = await pb
          .collection("facturas")
          .update(idFactura, facturasScheme);

        const nuevaResta =
          facturaAnterior?.presupuesto - Number(facturasScheme?.presupuesto); // 15.000 - 5.000 = 10.000

        // El resultado de esta facturasScheme?.presupuesto se tiene que restar al total de facturas
        const totalFacturas = await pb
          .collection("total_facturas")
          .getFullList({
            sort: "-created",
          });

        const onlyTotalFacUserAuth = totalFacturas.filter(
          (item) => item?.idUser == pb?.authStore?.model?.id
        );

        const restaTotalFacturas = onlyTotalFacUserAuth[0]?.total - nuevaResta;

        const dataRestaTotalFacturas = {
          total: restaTotalFacturas,
          idUser: pb?.authStore?.model?.id,
        };

        await pb
          .collection("total_facturas")
          .update(onlyTotalFacUserAuth[0]?.id, dataRestaTotalFacturas);

        // El resultado de esta nuevaResta se tiene que sumar al presupuesto por asignar
        const allPresupuestos = await pb
          .collection("total_presupuesto_por_asignar")
          .getFullList({
            sort: "-created",
          });

        const onlyPresupuestoUserAuth = allPresupuestos.filter(
          (item) => item?.idUser == pb?.authStore?.model?.id
        );

        const nuevaSuma = onlyPresupuestoUserAuth[0]?.total + nuevaResta;

        const dataUpdatePresupuesto = {
          total: nuevaSuma,
          idUser: pb?.authStore?.model?.id,
        };

        await pb
          .collection("total_presupuesto_por_asignar")
          .update(onlyPresupuestoUserAuth[0]?.id, dataUpdatePresupuesto);

        return facturaUpdate;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const addFacturas = async (facturasScheme) => {
  try {
    if (pb?.authStore?.isValid) {
      const addFacturas = await pb
        .collection("facturas")
        .create(facturasScheme);

      const allFacturasGet = await pb.collection("total_facturas").getFullList({
        sort: "-created",
      });

      const onlyFacturasAuthUser = allFacturasGet.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      if (onlyFacturasAuthUser.length <= 0) createFacturas();
      if (onlyFacturasAuthUser.length > 0) editFacturas();

      return addFacturas;
    }
  } catch (error) {
    console.log(error);
  }
};

/* GASTOS */

export const createGastos = async () => {
  try {
    if (pb?.authStore?.isValid) {
      const allGastos = await pb.collection("gastos").getFullList({
        sort: "-created",
      });

      const onlyGastosAuthUser = allGastos.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      const totalAmount = onlyGastosAuthUser.reduce(
        (acc, item) => (acc += item.presupuesto),
        0
      );

      const totalGstosObject = {
        total: totalAmount,
        idUser: pb?.authStore?.model?.id,
      };

      const saveTotalGastos = await pb
        .collection("total_gastos")
        .create(totalGstosObject);

      /* Edit presupuesto por asignar */

      const allPResupuetosXAsignar = await pb
        .collection("total_presupuesto_por_asignar")
        .getFullList({
          sort: "-created",
        });

      const onlyPresAuthUser = allPResupuetosXAsignar.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      const resta = onlyPresAuthUser[0]?.total - totalAmount;

      const data = {
        total: resta,
        idUser: pb?.authStore?.model?.id,
      };

      const record = await pb
        .collection("total_presupuesto_por_asignar")
        .update(onlyPresAuthUser[0]?.id, data);

      return saveTotalGastos;
    }
  } catch (error) {
    console.log(error);
  }
};

export const editGastos = async () => {
  try {
    if (pb?.authStore?.isValid) {
      const allGastos = await pb.collection("gastos").getFullList({
        sort: "-created",
      });

      const onlyGastosAuthUser = allGastos.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      const totalAmount = onlyGastosAuthUser.reduce(
        (acc, item) => (acc += item.presupuesto),
        0
      );

      const totalGstosObject = {
        total: totalAmount,
        idUser: pb?.authStore?.model?.id,
      };

      const allTotalGastosGet = await pb
        .collection("total_gastos")
        .getFullList({
          sort: "-created",
        });

      const getOnlyGastosAuthUser = allTotalGastosGet.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      const updateTotalGastos = await pb
        .collection("total_gastos")
        .update(getOnlyGastosAuthUser[0]?.id, totalGstosObject);

      /* Edit presupuesto por asignar */

      const allPResupuetosXAsignar = await pb
        .collection("total_presupuesto_por_asignar")
        .getFullList({
          sort: "-created",
        });

      const onlyPresAuthUser = allPResupuetosXAsignar.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      const resta =
        onlyPresAuthUser[0]?.total - onlyGastosAuthUser[0]?.presupuesto;

      const data = {
        total: resta,
        idUser: pb?.authStore?.model?.id,
      };

      const record = await pb
        .collection("total_presupuesto_por_asignar")
        .update(onlyPresAuthUser[0]?.id, data);

      return updateTotalGastos;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteGastos = async (dato) => {
  try {
    if (pb?.authStore?.model?.id) {
      const allPresupuestos = await pb
        .collection("total_presupuesto_por_asignar")
        .getFullList({
          sort: "-created",
        });

      const onlyPresupuestoAuthUser = allPresupuestos.filter(
        (item) => item?.idUser == pb?.authStore?.model?.id
      );

      const sumaDePres = onlyPresupuestoAuthUser[0]?.total + dato?.presupuesto;

      const sumaDePresupuesto = {
        total: sumaDePres,
        idUser: pb?.authStore?.model?.id,
      };

      await pb
        .collection("total_presupuesto_por_asignar")
        .update(onlyPresupuestoAuthUser[0]?.id, sumaDePresupuesto);

      /* Actualizar Total de gastos */
      const allTotalGastos = await pb.collection("total_gastos").getFullList({
        sort: "-created",
      });

      const onlyTotalGasAuthUser = allTotalGastos.filter(
        (item) => item?.idUser == pb?.authStore?.model?.id
      );

      const restaDeTotalGastos =
        onlyTotalGasAuthUser[0]?.total - dato?.presupuesto;

      const restaDelTotalGas = {
        total: restaDeTotalGastos,
        idUser: pb?.authStore?.model?.id,
      };

      await pb
        .collection("total_gastos")
        .update(onlyTotalGasAuthUser[0]?.id, restaDelTotalGas);

      /* Eliminar gastos */

      const deleteGastos = await pb.collection("gastos").delete(dato?.id);

      return deleteGastos;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateGastos = async (idGasto, gastosScheme) => {
  try {
    if (pb?.authStore?.isValid) {
      const gastoAnterior = await pb.collection("gastos").getOne(idGasto, {
        expand: "relField1,relField2.subRelField",
      });

      /* el nuevo gasto es mayor al anterior */
      if (gastoAnterior?.presupuesto < Number(gastosScheme?.presupuesto)) {
        // Se actualiza la gastos con el nuevo presupuesto

        const gastoUpdate = await pb
          .collection("gastos")
          .update(idGasto, gastosScheme);

        const nuevaResta =
          Number(gastosScheme?.presupuesto) - gastoAnterior?.presupuesto; // 7.000 - 5.000 = 2.000

        const totalGastos = await pb.collection("total_gastos").getFullList({
          sort: "-created",
        });

        const onlyTotalGasUserAuth = totalGastos.filter(
          (item) => item?.idUser == pb?.authStore?.model?.id
        );

        const sumaTotalGastos = onlyTotalGasUserAuth[0]?.total + nuevaResta;

        const dataSumaTotalGastos = {
          total: sumaTotalGastos,
          idUser: pb?.authStore?.model?.id,
        };

        await pb
          .collection("total_gastos")
          .update(onlyTotalGasUserAuth[0]?.id, dataSumaTotalGastos);

        // El resultado de esta nuevaResta se tiene que sumar al presupuesto por asignar
        const allPresupuestos = await pb
          .collection("total_presupuesto_por_asignar")
          .getFullList({
            sort: "-created",
          });

        const onlyPresupuestoUserAuth = allPresupuestos.filter(
          (item) => item?.idUser == pb?.authStore?.model?.id
        );

        const restaPresupuesto = onlyPresupuestoUserAuth[0]?.total - nuevaResta;

        const dataUpdatePresupuesto = {
          total: restaPresupuesto,
          idUser: pb?.authStore?.model?.id,
        };

        await pb
          .collection("total_presupuesto_por_asignar")
          .update(onlyPresupuestoUserAuth[0]?.id, dataUpdatePresupuesto);

        return gastoUpdate;
      }

      /* el nuevo gasto es menor al anterior */
      if (gastoAnterior?.presupuesto > Number(gastosScheme?.presupuesto)) {
        // Se actualiza el gasto con el nuevo presupuesto

        const gastoUpdate = await pb
          .collection("gastos")
          .update(idGasto, gastosScheme);

        const nuevaResta =
          gastoAnterior?.presupuesto - Number(gastosScheme?.presupuesto); // 15.000 - 5.000 = 10.000

        // El resultado de gastosScheme?.presupuesto se tiene que restar al total de gastos
        const totalGastos = await pb.collection("total_gastos").getFullList({
          sort: "-created",
        });

        const onlyTotalGasUserAuth = totalGastos.filter(
          (item) => item?.idUser == pb?.authStore?.model?.id
        );

        const restaTotalGastos = onlyTotalGasUserAuth[0]?.total - nuevaResta;

        const dataRestaTotalGastos = {
          total: restaTotalGastos,
          idUser: pb?.authStore?.model?.id,
        };

        await pb
          .collection("total_gastos")
          .update(onlyTotalGasUserAuth[0]?.id, dataRestaTotalGastos);

        // El resultado de esta nuevaResta se tiene que sumar al presupuesto por asignar
        const allPresupuestos = await pb
          .collection("total_presupuesto_por_asignar")
          .getFullList({
            sort: "-created",
          });

        const onlyPresupuestoUserAuth = allPresupuestos.filter(
          (item) => item?.idUser == pb?.authStore?.model?.id
        );

        const nuevaSuma = onlyPresupuestoUserAuth[0]?.total + nuevaResta;

        const dataUpdatePresupuesto = {
          total: nuevaSuma,
          idUser: pb?.authStore?.model?.id,
        };

        await pb
          .collection("total_presupuesto_por_asignar")
          .update(onlyPresupuestoUserAuth[0]?.id, dataUpdatePresupuesto);

        return gastoUpdate;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const addGastos = async (gastosScheme) => {
  try {
    if (pb?.authStore?.isValid) {
      const addGastos = await pb.collection("gastos").create(gastosScheme);

      const allTotalGastos = await pb.collection("total_gastos").getFullList({
        sort: "-created",
      });

      const onlyTotalGastosAuthUser = allTotalGastos.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      if (onlyTotalGastosAuthUser.length <= 0) createGastos();
      if (onlyTotalGastosAuthUser.length > 0) editGastos();

      return addGastos;
    }
  } catch (error) {
    console.log(error);
  }
};

/* AHORROS */

export const createAhorros = async () => {
  try {
    if (pb?.authStore?.isValid) {
      const allAhorros = await pb.collection("ahorros").getFullList({
        sort: "-created",
      });

      const onlyAhorrosAuthUser = allAhorros.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      const totalAmount = onlyAhorrosAuthUser.reduce(
        (acc, item) => (acc += item.presupuesto),
        0
      );

      const totalAhorrosObject = {
        total: totalAmount,
        idUser: pb?.authStore?.model?.id,
      };

      const saveTotalAhorros = await pb
        .collection("total_ahorros")
        .create(totalAhorrosObject);

      /* Edit presupuesto por asignar */

      const allPResupuetosXAsignar = await pb
        .collection("total_presupuesto_por_asignar")
        .getFullList({
          sort: "-created",
        });

      const onlyPresAuthUser = allPResupuetosXAsignar.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      const resta = onlyPresAuthUser[0]?.total - totalAmount;

      const data = {
        total: resta,
        idUser: pb?.authStore?.model?.id,
      };

      const record = await pb
        .collection("total_presupuesto_por_asignar")
        .update(onlyPresAuthUser[0]?.id, data);

      return saveTotalAhorros;
    }
  } catch (error) {
    console.log(error);
  }
};

export const editAhorros = async () => {
  try {
    if (pb?.authStore?.isValid) {
      const allAhorros = await pb.collection("ahorros").getFullList({
        sort: "-created",
      });

      const onlyAhorrosAuthUser = allAhorros.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      const totalAmount = onlyAhorrosAuthUser.reduce(
        (acc, item) => (acc += item.presupuesto),
        0
      );

      const totalAhorrosObject = {
        total: totalAmount,
        idUser: pb?.authStore?.model?.id,
      };

      const allTotalAhorrosGet = await pb
        .collection("total_ahorros")
        .getFullList({
          sort: "-created",
        });

      const getOnlyGastosAuthUser = allTotalAhorrosGet.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      const updateTotalGastos = await pb
        .collection("total_ahorros")
        .update(getOnlyGastosAuthUser[0]?.id, totalAhorrosObject);

      /* Edit presupuesto por asignar */

      const allPResupuetosXAsignar = await pb
        .collection("total_presupuesto_por_asignar")
        .getFullList({
          sort: "-created",
        });

      const onlyPresAuthUser = allPResupuetosXAsignar.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      const resta =
        onlyPresAuthUser[0]?.total - onlyAhorrosAuthUser[0]?.presupuesto;

      const data = {
        total: resta,
        idUser: pb?.authStore?.model?.id,
      };

      const record = await pb
        .collection("total_presupuesto_por_asignar")
        .update(onlyPresAuthUser[0]?.id, data);

      return updateTotalGastos;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteAhorros = async (dato) => {
  try {
    if (pb?.authStore?.isValid) {
      const allPresupuestos = await pb
        .collection("total_presupuesto_por_asignar")
        .getFullList({
          sort: "-created",
        });

      const onlyPresupuestoAuthUser = allPresupuestos.filter(
        (item) => item?.idUser == pb?.authStore?.model?.id
      );

      const sumaDePres = onlyPresupuestoAuthUser[0]?.total + dato?.presupuesto;

      const sumaDePresupuesto = {
        total: sumaDePres,
        idUser: pb?.authStore?.model?.id,
      };

      await pb
        .collection("total_presupuesto_por_asignar")
        .update(onlyPresupuestoAuthUser[0]?.id, sumaDePresupuesto);

      /* Actualizar Total de ahorros */
      const allTotalAhorros = await pb.collection("total_ahorros").getFullList({
        sort: "-created",
      });

      const onlyTotalAhorrosAuthUser = allTotalAhorros.filter(
        (item) => item?.idUser == pb?.authStore?.model?.id
      );

      const restaDeTotalAhorros =
        onlyTotalAhorrosAuthUser[0]?.total - dato?.presupuesto;

      const restaDelTotalAhorros = {
        total: restaDeTotalAhorros,
        idUser: pb?.authStore?.model?.id,
      };

      await pb
        .collection("total_ahorros")
        .update(onlyTotalAhorrosAuthUser[0]?.id, restaDelTotalAhorros);

      /* Eliminar gastos */
      const deleteAhorros = await pb.collection("ahorros").delete(dato?.id);

      return deleteAhorros;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateAhorros = async (idAhorro, ahorrosScheme) => {
  try {
    if (pb?.authStore?.isValid) {
      const ahorroAnterior = await pb.collection("ahorros").getOne(idAhorro, {
        expand: "relField1,relField2.subRelField",
      });

      /* el nuevo ahorro es mayor al anterior */
      if (ahorroAnterior?.presupuesto < Number(ahorrosScheme?.presupuesto)) {
        // Se actualiza la ahorros con el nuevo presupuesto

        const ahorroUpdate = await pb
          .collection("ahorros")
          .update(idAhorro, ahorrosScheme);

        const nuevaResta =
          Number(ahorrosScheme?.presupuesto) - ahorroAnterior?.presupuesto; // 7.000 - 5.000 = 2.000

        const totalAhorros = await pb.collection("total_ahorros").getFullList({
          sort: "-created",
        });

        const onlyTotalAhorrosUserAuth = totalAhorros.filter(
          (item) => item?.idUser == pb?.authStore?.model?.id
        );

        const sumaTotalAhorros =
          onlyTotalAhorrosUserAuth[0]?.total + nuevaResta;

        const dataSumaTotalAhorros = {
          total: sumaTotalAhorros,
          idUser: pb?.authStore?.model?.id,
        };

        await pb
          .collection("total_ahorros")
          .update(onlyTotalAhorrosUserAuth[0]?.id, dataSumaTotalAhorros);

        // El resultado de esta nuevaResta se tiene que sumar al presupuesto por asignar
        const allPresupuestos = await pb
          .collection("total_presupuesto_por_asignar")
          .getFullList({
            sort: "-created",
          });

        const onlyPresupuestoUserAuth = allPresupuestos.filter(
          (item) => item?.idUser == pb?.authStore?.model?.id
        );

        const restaPresupuesto = onlyPresupuestoUserAuth[0]?.total - nuevaResta;

        const dataUpdatePresupuesto = {
          total: restaPresupuesto,
          idUser: pb?.authStore?.model?.id,
        };

        await pb
          .collection("total_presupuesto_por_asignar")
          .update(onlyPresupuestoUserAuth[0]?.id, dataUpdatePresupuesto);

        return ahorroUpdate;
      }

      /* el nuevo ahorro es menor al anterior */
      if (ahorroAnterior?.presupuesto > Number(ahorrosScheme?.presupuesto)) {
        // Se actualiza el gasto con el nuevo presupuesto

        const ahorroUpdate = await pb
          .collection("ahorros")
          .update(idAhorro, ahorrosScheme);

        const nuevaResta =
          ahorroAnterior?.presupuesto - Number(ahorrosScheme?.presupuesto); // 15.000 - 5.000 = 10.000

        // El resultado de ahorrosScheme?.presupuesto se tiene que restar al total de ahorros
        const totalAhorros = await pb.collection("total_ahorros").getFullList({
          sort: "-created",
        });

        const onlyTotalAhorrosUserAuth = totalAhorros.filter(
          (item) => item?.idUser == pb?.authStore?.model?.id
        );

        const restaTotalAhorros =
          onlyTotalAhorrosUserAuth[0]?.total - nuevaResta;

        const dataRestaTotalAhorros = {
          total: restaTotalAhorros,
          idUser: pb?.authStore?.model?.id,
        };

        await pb
          .collection("total_ahorros")
          .update(onlyTotalAhorrosUserAuth[0]?.id, dataRestaTotalAhorros);

        // El resultado de esta nuevaResta se tiene que sumar al presupuesto por asignar
        const allPresupuestos = await pb
          .collection("total_presupuesto_por_asignar")
          .getFullList({
            sort: "-created",
          });

        const onlyPresupuestoUserAuth = allPresupuestos.filter(
          (item) => item?.idUser == pb?.authStore?.model?.id
        );

        const nuevaSuma = onlyPresupuestoUserAuth[0]?.total + nuevaResta;

        const dataUpdatePresupuesto = {
          total: nuevaSuma,
          idUser: pb?.authStore?.model?.id,
        };

        await pb
          .collection("total_presupuesto_por_asignar")
          .update(onlyPresupuestoUserAuth[0]?.id, dataUpdatePresupuesto);

        return ahorroUpdate;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const addAhorros = async (ahorrosScheme) => {
  try {
    if (pb?.authStore?.isValid) {
      const addAhorros = await pb.collection("ahorros").create(ahorrosScheme);

      const allTotalAhorros = await pb.collection("total_ahorros").getFullList({
        sort: "-created",
      });

      const onlyTotalAhorrosAuthUser = allTotalAhorros.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      if (onlyTotalAhorrosAuthUser.length <= 0) createAhorros();
      if (onlyTotalAhorrosAuthUser.length > 0) editAhorros();

      return addAhorros;
    }
  } catch (error) {
    console.log(error);
  }
};

/* GET */

export const getAllRevenue = async () => {
  try {
    if (pb?.authStore?.isValid) {
      const allRevenue = await pb.collection("ingresos").getFullList({
        sort: "-created",
      });

      const onlyRevenueUserAuth = allRevenue.filter(
        (item) => item?.idUser == pb?.authStore?.model?.id
      );

      return onlyRevenueUserAuth;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTotalRevenue = async () => {
  try {
    if (pb?.authStore?.isValid) {
      const records = await pb.collection("total_ingresos").getFullList({
        sort: "-created",
      });

      const onlyTotalAuthUser = records.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      return onlyTotalAuthUser;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTotalMethod50_30_20 = async () => {
  try {
    if (pb?.authStore?.isValid) {
      const records = await pb.collection("metodo_50_30_20").getFullList({
        sort: "-created",
      });

      const onlyMethodsAuthUser = records.filter(
        (item) => item?.idUser == pb?.authStore?.model?.id
      );

      return onlyMethodsAuthUser;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPresupuestoXAsignar = async () => {
  try {
    if (pb?.authStore?.isValid) {
      const records = await pb
        .collection("total_presupuesto_por_asignar")
        .getFullList({
          sort: "-created",
        });

      const onlyAuthUser = records.filter(
        (item) => item.idUser == pb?.authStore?.model?.id
      );

      return onlyAuthUser;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getFacutras = async () => {
  const allFacturas = await pb.collection("facturas").getFullList({
    sort: "-created",
  });

  const onlyFacturasAuthUser = allFacturas.filter(
    (item) => item.idUser == pb?.authStore?.model?.id
  );

  return onlyFacturasAuthUser;
};

export const getTotalFacutras = async () => {
  const allFacturas = await pb.collection("total_facturas").getFullList({
    sort: "-created",
  });

  const onlyTotalFacturasAuthUser = allFacturas.filter(
    (item) => item.idUser == pb?.authStore?.model?.id
  );

  return onlyTotalFacturasAuthUser;
};

export const getGastos = async () => {
  const allGastos = await pb.collection("gastos").getFullList({
    sort: "-created",
  });

  const onlyGastosAuthUser = allGastos.filter(
    (item) => item.idUser == pb?.authStore?.model?.id
  );

  return onlyGastosAuthUser;
};

export const getTotalGastos = async () => {
  const allGastos = await pb.collection("total_gastos").getFullList({
    sort: "-created",
  });

  const onlyTotalGastosAuthUser = allGastos.filter(
    (item) => item.idUser == pb?.authStore?.model?.id
  );

  return onlyTotalGastosAuthUser;
};

export const getAhorros = async () => {
  const allAhorros = await pb.collection("ahorros").getFullList({
    sort: "-created",
  });

  const onlyAhorrosAuthUser = allAhorros.filter(
    (item) => item.idUser == pb?.authStore?.model?.id
  );

  return onlyAhorrosAuthUser;
};

export const getTotalAhorros = async () => {
  const allAhorros = await pb.collection("total_ahorros").getFullList({
    sort: "-created",
  });

  const onlyTotalAhorrosAuthUser = allAhorros.filter(
    (item) => item.idUser == pb?.authStore?.model?.id
  );

  return onlyTotalAhorrosAuthUser;
};

export const getDataCategoriaForChart = async () => {
  try {
    if (pb?.authStore?.isValid) {
      const allDataCategorias = await pb
        .collection("data_categorias")
        .getFullList({
          sort: "-created",
        });

      const onlyCategoriasUserAuth = allDataCategorias.filter(
        (item) => item?.idUser == pb?.authStore?.model?.id
      );

      const [resultArray] = onlyCategoriasUserAuth;

      /*       console.log(onlyCategoriasUserAuth);
      console.log(resultArray); */

      return resultArray;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getDataCategorias = async () => {
  try {
    if (pb?.authStore?.isValid) {
      const allFacturas = await pb.collection("facturas").getFullList({
        sort: "-created",
      });

      const onlyFacturasAuth = allFacturas.filter(
        (item) => item?.idUser == pb?.authStore?.model?.id
      );

      const facturasNecesidades = onlyFacturasAuth.filter(
        (item) => item?.categorias == 1
      );

      const facturasDeseos = onlyFacturasAuth.filter(
        (item) => item?.categorias == 2
      );

      const facturasAhorros = onlyFacturasAuth.filter(
        (item) => item?.categorias == 3
      );

      const allGastos = await pb.collection("gastos").getFullList({
        sort: "-created",
      });

      const onlyGastosAuth = allGastos.filter(
        (item) => item?.idUser == pb?.authStore?.model?.id
      );

      const gastosNecesidades = onlyGastosAuth.filter(
        (item) => item?.categorias == 1
      );

      const gastosDeseos = onlyGastosAuth.filter(
        (item) => item?.categorias == 2
      );

      const gastosAhorros = onlyGastosAuth.filter(
        (item) => item?.categorias == 3
      );

      const allAhorros = await pb.collection("ahorros").getFullList({
        sort: "-created",
      });

      const onlyAhorrosAuth = allAhorros.filter(
        (item) => item?.idUser == pb?.authStore?.model?.id
      );

      const ahorrosNecesidades = onlyAhorrosAuth.filter(
        (item) => item?.categorias == 1
      );

      const ahorrosDeseos = onlyAhorrosAuth.filter(
        (item) => item?.categorias == 2
      );

      const ahorrosAhorros = onlyAhorrosAuth.filter(
        (item) => item?.categorias == 3
      );

      const sumaNecesidades =
        facturasNecesidades.length +
        gastosNecesidades.length +
        ahorrosNecesidades.length;

      const sumaDeseos =
        facturasDeseos.length + gastosDeseos.length + ahorrosDeseos.length;

      const sumaAhorros =
        facturasAhorros.length + gastosAhorros.length + ahorrosAhorros.length;

      const data = {
        necesidades: sumaNecesidades,
        deseos: sumaDeseos,
        ahorros: sumaAhorros,
        idUser: pb?.authStore?.model?.id,
        mes: hoy.format(soloMesFormato),
        ano: hoy.format(soloAño),
      };

      const allCategorias = await pb.collection("data_categorias").getFullList({
        sort: "-created",
      });

      const onlyCategoriasUserAuth = allCategorias.filter(
        (item) => item?.idUser == pb?.authStore?.model?.id
      );

      const mesHoy = hoy.format(soloMesFormato);
      const añoHoy = hoy.format(soloAño);

      if (onlyCategoriasUserAuth.length <= 0) {
        const crearCategorias = await pb
          .collection("data_categorias")
          .create(data);

        return crearCategorias;
      }

      if (onlyCategoriasUserAuth.length > 0) {
        if (
          onlyCategoriasUserAuth[0]?.mes == mesHoy &&
          onlyCategoriasUserAuth[0]?.ano == añoHoy
        ) {
          const newData = {
            necesidades: sumaNecesidades,
            deseos: sumaDeseos,
            ahorros: sumaAhorros,
            idUser: pb?.authStore?.model?.id,
            mes: onlyCategoriasUserAuth[0]?.mes,
            ano: onlyCategoriasUserAuth[0]?.ano,
          };

          const updateCategorias = await pb
            .collection("data_categorias")
            .update(onlyCategoriasUserAuth[0]?.id, newData);

          return updateCategorias;
        } else {
          const newData = {
            necesidades: sumaNecesidades,
            deseos: sumaDeseos,
            ahorros: sumaAhorros,
            idUser: pb?.authStore?.model?.id,
            mes:
              onlyCategoriasUserAuth[0]?.mes == mesHoy
                ? onlyCategoriasUserAuth[0]?.mes
                : mesHoy,
            ano:
              onlyCategoriasUserAuth[0]?.ano == añoHoy
                ? onlyCategoriasUserAuth[0]?.ano
                : añoHoy,
          };

          const crearCategorias = await pb
            .collection("data_categorias")
            .create(newData);

          return crearCategorias;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

getDataCategorias();
