"use client";
import React from "react";
import { addRevenue, pb, getRevenueRealtime } from "@/base/db/pocketbase";

const AddRevenue = () => {
  const [ingresosScheme, setIngresosScheme] = React.useState({
    ingresos: "",
    actual: 0,
    idUser: pb?.authStore?.model?.id,
  });
  const [tablaIngresos, setTablaIngresos] = React.useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setIngresosScheme({ ...ingresosScheme, [name]: value });
  };

  const handleSubmir = (e) => {
    e.preventDefault();

    addRevenue(ingresosScheme);
    setTablaIngresos([...tablaIngresos, ingresosScheme]);
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      AddRevenue
      <form onSubmit={handleSubmir}>
        <input
          type="text"
          placeholder="ingresos"
          name="ingresos"
          value={ingresosScheme.ingresos}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="actual"
          name="actual"
          value={ingresosScheme.actual}
          onChange={handleChange}
        />
        <button type="submit">Send</button>
      </form>
      {tablaIngresos?.map((dato) => (
        <p key={dato?.id}>{dato?.ingresos}</p>
      ))}
    </section>
  );
};

export default AddRevenue;
