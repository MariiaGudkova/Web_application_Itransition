import "./TableCell.css";

function TableCell(props) {
  const {
    id,
    name,
    email,
    registrationDate,
    lastLoginDate,
    status,
    isChecked,
  } = props.values;

  const { onChange } = props;

  return (
    <tr>
      <td>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckIndeterminate"
          checked={isChecked}
          onChange={() => onChange(id, !isChecked)}
        />
      </td>
      <td>{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{registrationDate}</td>
      <td>{lastLoginDate}</td>
      <td>{status}</td>
    </tr>
  );
}

export default TableCell;
