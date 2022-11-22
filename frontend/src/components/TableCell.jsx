import "./TableCell.css";

function TableCell(props) {
  const {
    _id,
    name,
    email,
    registrationDate,
    lastLoginDate,
    status,
    isChecked,
  } = props.values;

  const { onChange } = props;
  const registrDate = new Date(registrationDate).toLocaleString();
  const loginDate = new Date(lastLoginDate).toLocaleString();

  return (
    <tr>
      <td>
        <input
          className="form-check-input"
          type="checkbox"
          value={isChecked || ""}
          id="flexCheckIndeterminate"
          checked={isChecked}
          onChange={() => onChange(_id, !isChecked)}
        />
      </td>
      <td>{_id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{registrDate}</td>
      <td>{loginDate}</td>
      <td>{status}</td>
    </tr>
  );
}

export default TableCell;
