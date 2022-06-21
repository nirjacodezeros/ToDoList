import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserTable = (props) => {
  // const navigate = useNavigate();

  const add = () => {
    // navigate("/add");
  };

  const edit = (id) => {
    // navigate("/edit/" + id);
  };

  return (
    <div>
      <button onClick={() => add()} className="btn btn-primary">
        Add User
      </button>
      <table className="table table-striped ">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.users.length > 0 ? (
            props.users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                {/* <td>{user.contact}</td>
              <td>{user.status}</td> */}
                <td>
                  <button
                    onClick={() => edit(user.id)}
                    className="btn btn-info"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => props.deleteUser(user.id)}
                    className="button btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No users</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
