import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useNavigate,
} from "react-router-dom";

const Edit = () => {
  const initialFormState = { userId: "", title: "", body: "" };
  const [user, setUser] = useState(initialFormState);
  const navigate = useNavigate();

  const params = useParams();
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/" + params.id)
      .then((res) => {
        const { userId, title, body } = res.data;
        setUser({ userId, title, body });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .put("https://jsonplaceholder.typicode.com/posts/" + params.id, user)
      .then((response) => {
        console.log("r.......", response);
        if (response.status === 200) {
          alert("successfully updated");
          navigate("/");
        } else Promise.reject();
      })
      .catch((err) => {
        console.log("err.......", err);
      });
  };

  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>userId</label>
          <input
            type="text"
            name="userId"
            value={user.userId}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={user.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Body</label>
          <input
            type="text"
            name="body"
            value={user.body}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
  // }
};

export default Edit;
