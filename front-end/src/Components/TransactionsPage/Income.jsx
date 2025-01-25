export const Income = ({ income }) => {
  return (
    <tr key={income.id}>
      <td>{income.transaction_date}</td>
      <td>{income.transaction_name}</td>
      <td>${income.transaction_amount.toFixed(2)}</td>
    </tr>
  );
};
