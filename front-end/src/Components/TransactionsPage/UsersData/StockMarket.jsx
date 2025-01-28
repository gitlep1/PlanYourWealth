import { useEffect, useState } from "react";
import { fetchStockData } from "../UsersData/fetchStockData";

const StockMarket = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const stockSymbols = [
    "AAPL",
    "MSFT",
    "GOOGL",
    "TSLA",
    "AMZN",
    "META",
    "NFLX",
  ];

  useEffect(() => {
    const fetchStocks = async () => {
      const stockPromises = stockSymbols.map(fetchStockData);
      const stockData = await Promise.all(stockPromises);

      const validStocks = stockData.filter((stock) => stock !== null);
      const sortedStocks = validStocks.sort(
        (a, b) => b.changePercent - a.changePercent
      );

      const topGainers = sortedStocks
        .filter((stock) => stock.changePercent > 0)
        .slice(0, 3);
      const topLosers = sortedStocks
        .filter((stock) => stock.changePercent < 0)
        .slice(0, 2);

      setStocks([...topGainers, ...topLosers]);
      setLoading(false);
    };

    fetchStocks();
  }, []); //eslint-disable-line

  return (
    <div className="stock-market">
      <h3>Top 5 Daily Stocks</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Change (%)</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr
                key={index}
                className={stock.changePercent > 0 ? "positive" : "negative"}
              >
                <td>{stock.name}</td>
                <td>
                  {stock.changePercent > 0
                    ? `+${stock.changePercent.toFixed(2)}%`
                    : `${stock.changePercent.toFixed(2)}%`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StockMarket;
