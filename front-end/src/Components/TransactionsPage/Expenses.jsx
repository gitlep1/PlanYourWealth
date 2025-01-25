export const Expenses = ({ expense }) => {
  return (
    <tr key={expense.id}>
      <td>{expense.transaction_date}</td>
      <td>{expense.transaction_name}</td>
      <td>${expense.transaction_amount.toFixed(2)}</td>
    </tr>
  );
};
