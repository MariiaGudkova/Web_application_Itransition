import React from "react";
import "./Main.css";
import TableCell from "./TableCell";

function Main(props) {
  const {
    cells,
    isCheckedAll,
    onCheckAll,
    onUpdateCellChecked,
    onUnblockUserClick,
    onBlockUserClick,
    onDeleteUserClick,
  } = props;

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
        <button
          type="button"
          className="btn btn-warning fw-bold"
          onClick={() => {
            onUnblockUserClick();
          }}
        >
          <i className="bi-unlock-fill"></i>
        </button>
        <button
          type="button"
          className="btn btn-warning fw-bold"
          onClick={() => {
            onBlockUserClick();
          }}
        >
          <i className="bi-lock-fill"></i>
        </button>

        <button
          type="button"
          className="btn btn-warning fw-bold"
          onClick={() => {
            onDeleteUserClick();
          }}
        >
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
                value={isCheckedAll || ""}
                id="flexCheckIndeterminate"
                checked={isCheckedAll}
                onChange={() => {
                  onCheckAll();
                }}
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
                key={cell._id}
                onChange={onUpdateCellChecked}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default Main;
