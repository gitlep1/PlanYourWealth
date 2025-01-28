/* eslint-disable react/prop-types */
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { colorArray } from "./incomeColorArray";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Incomes = ({ incomeTransactions }) => {
  let pieChartData = {};

  const labels = incomeTransactions.map((t) => t.transaction_name);
  const data = incomeTransactions.map((t) => t.transaction_amount);

  const hoverBackgroundColors = [...colorArray];

  pieChartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colorArray,
        hoverBackgroundColor: hoverBackgroundColors,
      },
    ],
  };

  return incomeTransactions.length > 0 ? (
    <Pie data={pieChartData} />
  ) : (
    <p>No income data available</p>
  );
};
