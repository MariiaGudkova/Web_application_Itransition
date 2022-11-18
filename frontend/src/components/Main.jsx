import React from "react";
import "./Main.css";
import TableCell from "./TableCell";

function Main(props) {
  // const { cells } = props;
  const cellsDefault = [
    {
      id: 1,
      name: "Vasya",
      email: "vasya@gmail.com",
      registrationDate: "18.11.2022",
      lastLoginDate: "18.11.2022",
      status: "Block",
      isChecked: false,
    },
    {
      id: 2,
      name: "Masha",
      email: "masha@gmail.com",
      registrationDate: "16.11.2022",
      lastLoginDate: "17.11.2022",
      status: "Unblock",
      isChecked: false,
    },
  ];

  // api.delete(cells.filter(cell => cell.isChecked).map(cell => cell.id));

  const [cells, setCells] = React.useState(cellsDefault);
  const [isCheckedAll, setCheckedAll] = React.useState(false);

  function checkAll() {
    const newCells = cells.map((cell) => ({
      ...cell,
      isChecked: !isCheckedAll,
    }));
    setCells(newCells);
    setCheckedAll(!isCheckedAll);
  }

  function updateCellChecked(id, isChecked) {
    const newCells = cells.map((cell) =>
      cell.id === id ? { ...cell, isChecked } : cell
    );
    setCells(newCells);
    setCheckedAll(newCells.every((cell) => cell.isChecked));
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <p className="fs-1 text-center fw-bold text-light main-title">
        Таблица пользователей
      </p>
      <div
        className="btn-group main-buttons"
        role="group"
        aria-label="Basic mixed styles example"
      >
        <button type="button" className="btn btn-warning fw-bold">
          <i className="bi-unlock-fill"></i>
        </button>
        <button type="button" className="btn btn-warning fw-bold">
          <i className="bi-lock-fill"></i>
        </button>

        <button type="button" className="btn btn-warning fw-bold">
          <i className="bi-trash3-fill"></i>
        </button>
      </div>
      <table className="table table-hover table-light main-table">
        <thead className="table-primary">
          <tr>
            <th scope="col">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckIndeterminate"
                checked={isCheckedAll}
                onChange={checkAll}
              />
              <label
                className="form-check-label"
                htmlFor="flexCheckIndeterminate"
              >
                Выделить/Отменить все
              </label>
            </th>
            <th scope="col">Id</th>
            <th scope="col">Имя</th>
            <th scope="col">Email</th>
            <th scope="col">Дата регистрации</th>
            <th scope="col">Дата последнего входа</th>
            <th scope="col">Статус</th>
          </tr>
        </thead>
        <tbody>
          {cells.map((cell) => {
            return (
              <TableCell
                values={cell}
                key={cell.id}
                onChange={updateCellChecked}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default Main;
