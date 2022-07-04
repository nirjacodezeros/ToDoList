import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../../utilities/Forms";
import { useFormik } from "formik";

const onSubmit = (e) => {
  console.log("Val...........", e);
};

const validate = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Name Is Required";
  }
  if (!values.email) {
    errors.email = "Email Is Required";
  }
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (values.email && !values.email.match(reg)) {
    errors.email = "Email Field is Invalid ";
  }
  if (!values.password) {
    errors.password = "Please enter your password.";
  }
  if (!values.confirm_password) {
    errors.confirm_password = "Please enter your password.";
  }
  if (
    typeof values.password !== "undefined" &&
    typeof values.confirm_password !== "undefined"
  ) {
    if (values.password != values.confirm_password) {
      errors.confirm_password = "Passwords don't match.";
    }
  }
  return errors;
};

const initialValues = {
  name: "",
  email: "",
  password: "",
};

export default function AddFormik() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div className="row g-0 auth-wrapper">
      <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
        <div className="auth-background-holder"></div>
        <div className="auth-background-mask"></div>
      </div>

      <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
        <div className="d-flex flex-column align-content-end">
          <div className="auth-body mx-auto">
            <p className="text-center">Add</p>
            <div className="auth-form-container text-start">
              <form
                className="auth-form"
                onSubmit={formik.handleSubmit}
                autoComplete={"off"}
              >
                <div className="name mb-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={formik.handleChange}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="error">{formik.errors.name}</div>
                  ) : null}
                </div>

                <div className="email mb-3">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                  ) : null}
                </div>

                <div className="password mb-3">
                  <div className="input-group">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={formik.handleChange}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="error">{formik.errors.password}</div>
                    ) : null}
                  </div>
                </div>

                <div className="password mb-3">
                  <div className="input-group">
                    <input
                      type="password"
                      name="confirm_password"
                      placeholder="confirm_password"
                      onChange={formik.handleChange}
                    />
                    {formik.touched.confirm_password && formik.errors.confirm_password ? (
                      <div className="error">
                        {formik.errors.confirm_password}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 theme-btn mx-auto"
                  >
                    Submit
                  </button>
                </div>
              </form>

              <hr />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
