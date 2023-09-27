"use client";

import React from "react";
import { VictoryPie } from "victory";

const CategoriasPie = ({ n = 0, d = 0, a = 0 }) => {
  const initialValue = 100;

  console.log(initialValue - n);

  return (
    <div className="w-full h-72">
      <VictoryPie
        colorScale={["#F5A524", "#F31260", "#46B95F"]}
        animate={{ duration: 2000 }}
        data={[
          { x: "Necesidades", y: n },
          { x: "Deseos", y: d },
          { x: "Ahorros", y: a },
        ]}
        labels={["", "", ""]}
        /* labels={({ datum }) => `${datum.x}: ${datum.y}`} */
        /* labelPosition={({ index }) => (index ? "centroid" : "startAngle")} */
        /* labelPlacement={({ index }) => (index ? "parallel" : "vertical")} */
      />
    </div>
  );
};

export default CategoriasPie;
