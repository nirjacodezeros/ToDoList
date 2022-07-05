import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { service } from "./Service";

export default function ListFormikYup(match) {
  const { path } = match;
  const [users, setUsers] = useState(null);

  useEffect(() => {
    service.getItem().then((x) => setUsers(x.data.data));
  }, []);

  function deleteUser(id) {
    /* setUsers(
      users.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    ); */
    service.deleteItem(id).then((x) => setUsers(x.data.data));
  }

  return (
    <div>
      <h1>Users</h1>
      <Link to={`/addItem`} className="btn btn-sm btn-success mb-2">
        Add User
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Name</th>
            <th style={{ width: "30%" }}>Email</th>
            <th style={{ width: "30%" }}>Gender</th>
            <th style={{ width: "30%" }}>Country</th>
            <th style={{ width: "30%" }}>Image</th>
            <th style={{ width: "10%" }}></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id}>
                <td>
                  {user.title} {user.name}
                </td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.country}</td>
                <td>{user.image}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to={`/editItem/${user._id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="btn btn-sm btn-danger btn-delete-user"
                  >
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          {!users && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="spinner-border spinner-border-lg align-center"></div>
              </td>
            </tr>
          )}
          {users && !users.length && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="p-2">No Users To Display</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export { ListFormikYup };
