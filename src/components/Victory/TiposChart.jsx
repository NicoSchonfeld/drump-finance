"use client";

import React from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryPie,
  VictoryTheme,
} from "victory";

const TiposChart = ({ n = 100, d = 100, a = 100 }) => {
  const colorFill = (datum) => {
    if (datum.x == "Necesidades") return "#fde047";
    if (datum.x == "Deseos") return "#f87171";
    if (datum.x == "Ahorros") return "#4ade80";
  };

  return (
    <div className="w-full h-72 flex items-center">
      <VictoryPie
        colorScale={["#fde047", "#f87171", "#4ade80"]}
        animate={{ duration: 2000 }}
        standalone={true}
        data={[
          { x: "Necesidades", y: (n / 100) * 100 },
          { x: "Deseos", y: (d / 100) * 100 },
          { x: "Ahorros", y: (a / 100) * 100 },
        ]}
        labels={["", "", ""]}
        innerRadius={70}
        labelRadius={100}
        style={{ labels: { fontSize: 20, fill: "black" } }}
      />
    </div>
  );
};

export default TiposChart;
