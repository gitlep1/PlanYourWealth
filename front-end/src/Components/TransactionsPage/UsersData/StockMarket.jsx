import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchStockData } from "../UsersData/fetchStockData";

export const StockMarket = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockStockData = [
    { name: "AAPL", change: 2.3 },
    { name: "TSLA", change: 1.8 },
    { name: "AMZN", change: 0.9 },
    { name: "GOOG", change: -1.2 },
    { name: "MSFT", change: -0.8 },
  ];

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
    fetchStocks();
  }, []); //eslint-disable-line

  const fetchStocks = async () => {
    if (stocks.length < 2) {
      setLoading(false);
      return null;
    }

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

  const renderLiveStockData = () => {
    return stocks.map((stock, index) => (
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
    ));
  };

  const renderMockStockData = () => {
    return mockStockData.map((stock, index) => (
      <tr key={index} className={stock.change > 0 ? "positive" : "negative"}>
        <td>{stock.name}</td>
        <td>{stock.change > 0 ? `+${stock.change}%` : `${stock.change}%`}</td>
      </tr>
    ));
  };

  return (
    <div className="stock-market">
      {stocks.length > 2 ? (
        <h3>Stock Market Overview (Live)</h3>
      ) : (
        <h3>Stock Market Overview (Not Live)</h3>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Change (%)</th>
            </tr>
          </thead>
          <tbody>
            {stocks.length > 2 ? renderLiveStockData() : renderMockStockData()}
          </tbody>
        </Table>
      )}
    </div>
  );
};
