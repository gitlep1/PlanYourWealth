export const Incomes = ({ income, error }) => {
  return (
    <div className="transactions-list" key={income.id}>
      {error && <div>{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Dateee</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{income.transaction_date}</td>
            <td>{income.transaction_name}</td>
            <td>${income.transaction_amount.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
