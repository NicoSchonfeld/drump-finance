"use client";

import React from "react";
import { VictoryPie } from "victory";

const CategoriasPie = ({ n = 100, d = 100, a = 100 }) => {
  return (
    <div className="w-full h-72">
      <VictoryPie
        colorScale={["#fde047", "#f87171", "#4ade80"]}
        animate={{ duration: 2000 }}
        data={[
          { x: "Necesidades", y: (n / 100) * 100 },
          { x: "Deseos", y: (d / 100) * 100 },
          { x: "Ahorros", y: (a / 100) * 100 },
        ]}
        labels={["", "", ""]}
        /* labels={({ datum }) => `${datum.x}`} */
        /* labelPosition={({ index }) => (index ? "centroid" : "startAngle")} */
        /* labelPlacement={({ index }) => (index ? "parallel" : "vertical")} */
      />
    </div>
  );
};

export default CategoriasPie;
