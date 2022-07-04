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
  return errors;
};

const initialValues = {
  name: "",
  email: "",
};

export default function Edit() {
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
            <p className="text-center">Edit</p>
            <div className="auth-form-container text-start">
              <form
                className="auth-form"
                onSubmit={formik.handleSubmit}
                autoComplete={"off"}
              >
                <div className="name mb-3">
                  <input
                    type="text"
                    // id="name"
                    name="name"
                    // value={name}
                    placeholder="Name"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.name ? (
                    <div className="error">{formik.errors.name}</div>
                  ) : null}
                </div>

                <div className="email mb-3">
                  <input
                    type="text"
                    // id="email"
                    name="email"
                    // value={email}
                    placeholder="Email"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                  ) : null}
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
              <div className="auth-option text-center pt-2">
                Have an account?{" "}
                <Link className="text-link" to="/login">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
