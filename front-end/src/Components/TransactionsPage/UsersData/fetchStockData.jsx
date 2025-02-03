import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY_AV;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchStockData = async (symbol) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: "GLOBAL_QUOTE",
        symbol: symbol,
        apikey: API_KEY,
      },
    });

    const stockData = response.data["Global Quote"];
    return {
      name: symbol,
      changePercent: parseFloat(
        stockData["10. change percent"].replace("%", "")
      ),
    };
  } catch (error) {
    return "Error fetching stock data:", error;
  }
};
