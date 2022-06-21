import axios from "axios";
import React, { Component, useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useNavigate,
} from "react-router-dom";

const List = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteUser = (id) => {
    setUsers(
      users.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    axios
      .delete("https://jsonplaceholder.typicode.com/posts/" + id)
      .then(() => {
        setUsers((users) => users.filter((x) => x.id !== id));
      })
      .catch((err) => alert("Something went wrong"));
    // axios
    //   .delete("https://jsonplaceholder.typicode.com/posts/" + id)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       alert("Student successfully deleted");
    //       window.location.reload();
    //     } else Promise.reject();
    //   })
    //   .catch((err) => alert("Something went wrong"));
  };

  const add = () => {
    navigate("/add");
  };
  const edit = (id) => {
    navigate("/edit/" + id);
  };

  return (
    <div>
      <h1>Users</h1>
      <button className="btn btn-sm btn-primary btn-add-user" onClick={() => add()}>Add User</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Id</th>
            <th style={{ width: "30%" }}>Title</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td> {user.title} </td>
                <td style={{ whiteSpace: "nowrap" }}>
                <button className="btn btn-sm btn-info btn-edit-user" onClick={() => edit(user.id)}>Edit
                </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="btn btn-sm btn-danger btn-delete-user"
                    disabled={user.isDeleting}
                  >
                    {user.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Delete</span>
                    )}
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
};

export default List;
