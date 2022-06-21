import axios from "axios";
import { Formik } from "formik";
import React, { Component, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useNavigate,
} from "react-router-dom";
import FormikForm from "../components/FormikForm";
import NewFormDemo from "../components/NewFormDemo";

const Add = () => {
  const initialFormState = {
    userId: "",
    title: "",
    body: "",
    status: "Active",
  };
  const [user, setUser] = useState(initialFormState);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    if (event.target.files && event.target.files[0]) {
      setUser(URL.createObjectURL(event.target.files[0]));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("https://jsonplaceholder.typicode.com/posts", user)
      .then((response) => {
        console.log("r.......", response);
        navigate("/");
      })
      .catch((err) => {
        console.log("err.......", err);
      });
  };

  return (
    <div>
      {/* <FormikForm /> */}
      {/* <NewFormDemo/> */}
      <h1>Add User</h1>
      <form onSubmit={submitHandler}>
        {/* <div className="form-group">
          <label>userId</label>
          <input type="text" name="userId" onChange={handleInputChange} />
        </div> */}
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" onChange={handleInputChange} />
        </div>
         <div className="form-group">
          <label>Body</label>
          <input type="text" name="body" onChange={handleInputChange} />
        </div>
       {/* <div className="form-group">
          <label>Country</label>
          <select name="title">
            <option value=""></option>
            <option value="india">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="canada">Canada</option>
          </select>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="Email">Status:</label>
          <label className="form-check-label">
            <input
              type="radio"
              name="status"
              value="Active"
              onChange={handleInputChange}
              checked
            />
            Active
          </label>
          <label className="form-check-label">
            <input
              type="radio"
              name="status"
              value="Inactive"
              onChange={handleInputChange}
            />
            Inactive
          </label>
        </div> */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
  // }
};

export default Add;
