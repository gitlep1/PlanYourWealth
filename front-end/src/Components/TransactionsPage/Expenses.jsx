export const Expenses = ({ expense, error }) => {
  return (
    <div className="transactions-list" key={expense.id}>
      {error && <div>{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{expense.transaction_date}</td>
            <td>{expense.transaction_name}</td>
            <td>${expense.transaction_amount.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
