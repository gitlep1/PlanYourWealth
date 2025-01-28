import "./Transactions.scss";
import Cookies from "js-cookie";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { MockTransactionsPage } from "./MockData";
import { UsersTransactionsPage } from "./UsersData/UsersData";

ChartJS.register(ArcElement, Tooltip, Legend);

export const TransactionsPage = () => {
  const authUser = Cookies.get("authUser") || null;

  return authUser !== null ? (
    <UsersTransactionsPage />
  ) : (
    <MockTransactionsPage />
  );
};
