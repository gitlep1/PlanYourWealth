/* eslint-disable react/prop-types */
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { colorArray } from "./expenseColorArray";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Expenses = ({ expenseTransactions }) => {
  const labels = expenseTransactions.map((t) => t.transaction_name);
  const data = expenseTransactions.map((t) => t.transaction_amount);

  const hoverBackgroundColors = [...colorArray];

  const pieChartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colorArray,
        hoverBackgroundColor: hoverBackgroundColors,
      },
    ],
  };

  return expenseTransactions.length > 0 ? (
    <Pie data={pieChartData} />
  ) : (
    <p>No expense data available</p>
  );
};
