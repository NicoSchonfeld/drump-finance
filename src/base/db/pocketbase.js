import PocketBase from "pocketbase";

const URL = process.env.URL_POCKETBASE_PROD || "http://127.0.0.1:8090";
export const pb = new PocketBase(URL);

export const isValid = pb.authStore.isValid;

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

      console.log(onlyIngresosUserAuth);

      if (onlyIngresosUserAuth.length <= 0) totalRevenue();
      if (onlyIngresosUserAuth.length > 0) editTotalRevenue();

      return resAddRevenue;
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
