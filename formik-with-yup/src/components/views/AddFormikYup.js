import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { service } from "./Service";
import { Link, useHistory, useParams } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

export default function AddFormikYup() {
  let initialValues = {
    name: "",
    email: "",
    country: "",
    gender: "",
    hobby: [],
    password: "",
    confirmPassword: "",
    image: [],
  };

  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
  const [user, setUser] = useState(initialValues);
  const history = useHistory();
  useEffect(() => {
    if (!isAddMode) {
      // get user and set form fields
      service.getItemId(params.id).then((user) => {
         initialValues.name = user.data.data.name;
        initialValues.email = user.data.data.email;
        initialValues.country = user.data.data.country;
        initialValues.gender = user.data.data.gender;
        initialValues.hobby = user.data.data.hobby; 
        // initialValues.image = user.data.data.image;
        setUser(user.data.data);
      });
    }
  }, []);

  const params = useParams();
  let id;
  if (params.id) {
    id = params.id;
  }
  const isAddMode = !id;

  const [img, setImg] = useState(initialValues);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    country: Yup.string().required("Country is required"),
    gender: Yup.string().required("Gender is required"),
    hobby: Yup.string().required("Hobby is required"),

    image: Yup.string().required("Image is required"),
    /* .test(
         "fileSize",
         "File size too large, max file size is 1 Mb" ,
         (file) => {
           if (file) {
             return file.size <= 1100000;
           } else {
             return true;
           }
         }
       ) */
    //   .test("FILE_FORMAT", "Uploaded file has unsupported format.", (value) => {
    //     if (value) {
    //       return ["image/jpg", "image/jpeg", "image/png"].includes(value.type);
    //     } else {
    //       return true;
    //     }
    //   }),
  });

  const handleInputChange = (event) => {
    setUser({ ...user });
    if (event.target.files && event.target.files.length >= 1) {
      for (var i = 0; i < event.target.files.length; i++) {
        user.image.push(URL.createObjectURL(event.target.files[i]));
      }
    }
    setUser(user);
  };

  function deleteFile(e) {
    user.image.splice(e, 1);
    setUser(user);
  }

  function onSubmit(fields, { setStatus, setSubmitting }) {
    // setStatus();
    fields.image = user.image;
    if (isAddMode) {
      createUser(fields, setSubmitting);
      history.push("/");
    } else {
      updateItem(id, fields, setSubmitting);
      history.push("/");
    }
  }

  function createUser(fields, setSubmitting) {
    service
      .addNewItem(fields)
      .then((data) => {
        if (data.data.success) {
          toastr.success(data.data.message);
        }
        else{
          toastr.error(data.data.message);
        }
      })
      .catch(() => {
        setSubmitting(false);
        // alertService.error(error);
      });
  }

  function updateItem(id, fields, setSubmitting) {
    service
      .updateItem(id, fields)
      .then((data) => {
        if (data.data.success) {
          toastr.success(data.data.message);
        }
        else{
          toastr.error(data.data.message);
        }
      })
      .catch((error) => {
        setSubmitting(false);
      });
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => {
        return (
          <Form>
            <h1>{isAddMode ? "Add Item" : "Edit Item"}</h1>
            <div className="form-row">
              <div className="form-group col-5">
                <label>Name</label>
                <Field
                  name="name"
                  value={user.name}
                  type="text"
                  className={
                    "form-control" +
                    (errors.name && touched.name ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group col-5">
                <label>Email</label>
                <Field
                  name="email"
                  type="text"
                  className={
                    "form-control" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-5">
                <label>Country</label>
                <Field
                  name="country"
                  as="select"
                  className={
                    "form-control" +
                    (errors.country && touched.country ? " is-invalid" : "")
                  }
                >
                  <option value=""></option>
                  <option value="IND">India</option>
                  <option value="USA">USA</option>
                  <option value="AUSTRALIA">Australia</option>
                  <option value="CANADA">Canada</option>
                </Field>
                <ErrorMessage
                  name="country"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group col-5">
                <label>Gender</label>
                <Field
                  name="gender"
                  component="div"
                  className={
                    "form-control" +
                    (errors.gender && touched.gender ? " is-invalid" : "")
                  }
                >
                  <label>
                    <Field type="radio" name="gender" value="male" />
                    Male
                  </label>
                  <label>
                    <Field type="radio" name="gender" value="female" />
                    Female
                  </label>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group col-5">
                <label>Hobby</label>
                <Field
                  name="hobby"
                  component="div"
                  className={
                    "form-control" +
                    (errors.hobby && touched.hobby ? " is-invalid" : "")
                  }
                >
                  <label>
                    <Field type="checkbox" name="hobby" value="reading" />
                    Reading
                  </label>
                  <label>
                    <Field type="checkbox" name="hobby" value="travelling" />
                    Travelling
                  </label>
                  <label>
                    <Field type="checkbox" name="hobby" value="swimming" />
                    Swimming
                  </label>
                </Field>
                <ErrorMessage
                  name="hobby"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div className="form-row">
              {/*  <div className="form-group col-5">
                <label>Password</label>
                <Field
                  name="password"
                  type="password"
                  className={
                    "form-control" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group col-5">
                <label>Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className={
                    "form-control" +
                    (errors.confirmPassword && touched.confirmPassword
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="invalid-feedback"
                />
              </div> */}

              <div className="form-group col-5">
                <label>Image</label>
                <Field
                  name="image"
                  multiple
                  component="div"
                  className={
                    "form-control" +
                    (errors.image && touched.image ? " is-invalid" : "")
                  }
                >
                  <Field
                    type="file"
                    name="image"
                    multiple
                    onChange={handleInputChange}
                  />
                  <div className="form-group preview">
                    {user && user.image && user.image.length > 0 ? (
                      user.image.map((item, index) => {
                        return (
                          <div key={index}>
                            <img src={item} alt="" width="60px" />
                            <button
                              type="button"
                              onClick={() => deleteFile(index)}
                            >
                              delete
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <img src={""} alt="" />
                    )}
                  </div>
                </Field>
                <ErrorMessage
                  name="image"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div className="form-group">
              <button
                type="submit"
                // disabled={isSubmitting}
                className="btn btn-primary"
              >
                {/* {isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )} */}
                Save
              </button>
              {/* <Link to={isAddMode ? "." : ".."} className="btn btn-link">
                Cancel
              </Link> */}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
