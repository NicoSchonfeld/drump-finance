import PocketBase from "pocketbase";

const URL = process.env.URL_POCKETBASE_PROD || "http://127.0.0.1:8090";
export const pb = new PocketBase(URL);

export const isValid = pb.authStore.isValid;

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
      const total_50 = totalAmount * 0.5;
      const total_30 = totalAmount * 0.3;
      const total_20 = totalAmount * 0.2;

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

      const data = {
        total: onlyPresAuthUser[0]?.total - totalPresupuestoFacturas,
        idUser: pb?.authStore?.model?.id,
      };

      const record = await pb
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

      const data = {
        total: onlyPresAuthUser[0]?.total - totalFacturas,
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

      const data = {
        total: onlyPresAuthUser[0]?.total - totalAmount,
        idUser: pb?.authStore?.model?.id,
      };

      const record = await pb
        .collection("total_presupuesto_por_asignar")
        .update(onlyPresAuthUser[0]?.id, data);

      console.log(
        JSON.stringify(record, null, 2) + " <<<<<<<<<<<<<<<<<<<<<<<<"
      );

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

      const data = {
        total: onlyPresAuthUser[0]?.total - totalAmount,
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

      const data = {
        total: onlyPresAuthUser[0]?.total - totalAmount,
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

      const data = {
        total: onlyPresAuthUser[0]?.total - totalAmount,
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
