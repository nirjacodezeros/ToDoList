import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

export default function AddEditFormikYup() {
  const initialValues = {
    name: "",
    email: "",
    country: "",
    gender: "",
    hobby: [],
    password: "",
    confirmPassword: "",
    image: [],
  };
  const [img, setImg] = useState(initialValues);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    country: Yup.string().required("Country is required"),
    gender: Yup.string().required("Gender is required"),
    hobby: Yup.string().required("Hobby is required"),
    password: Yup.string()
      .concat(Yup.string().required("Password is required"))
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .when("password", (password, schema) => {
        if (password) return schema.required("Confirm Password is required");
      })
      .oneOf([Yup.ref("password")], "Passwords must match"),
    image: Yup.string()
      .required("Image is required")
      .test(
        "fileSize",
        "File size too large, max file size is 1 Mb" ,
        (file) => {
          if (file) {
            return file.size <= 1100000;
          } else {
            return true;
          }
        }
      )
      .test("FILE_FORMAT", "Uploaded file has unsupported format.", (value) => {
        if (value) {
          return ["image/jpg", "image/jpeg", "image/png"].includes(value.type);
        } else {
          return true;
        }
      }),
    
  });

  const handleInputChange = (event) => {
    setImg({ ...img });
    if (event.target.files && event.target.files.length >= 1) {
      for (var i = 0; i < event.target.files.length; i++) {
        img.image.push(URL.createObjectURL(event.target.files[i]));
      }
    }
    setImg(img);
  };

  function deleteFile(e) {
    img.image.splice(e, 1);
    setImg(img);
    console.log("im......", img);
  }

  function onSubmit(fields, { setStatus, setSubmitting }) {
    console.log("data......", fields);
    alert("Update Sucessfully....!!", fields);
    setStatus();
  }

  // function createUser(fields, setSubmitting) {
  //   userService.create(fields)
  //       .then(() => {
  //           alertService.success('User added', { keepAfterRouteChange: true });
  //           history.push('.');
  //       })
  //       .catch(() => {
  //           setSubmitting(false);
  //           alertService.error(error);
  //       });
  // }

  // function updateUser(id, fields, setSubmitting) {
  //   userService.update(id, fields)
  //       .then(() => {
  //           alertService.success('User updated', { keepAfterRouteChange: true });
  //           history.push('..');
  //       })
  //       .catch(error => {
  //           setSubmitting(false);
  //           alertService.error(error);
  //       });
  // }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue }) => {
        // const [user, setUser] = useState({});
        // const [showPassword, setShowPassword] = useState(false);

        // useEffect(() => {
        //   if (!isAddMode) {
        //     // get user and set form fields
        //     userService.getById(id).then((user) => {
        //       const fields = [
        //         "title",
        //         "firstName",
        //         "lastName",
        //         "email",
        //         "role",
        //       ];
        //       fields.forEach((field) =>
        //         setFieldValue(field, user[field], false)
        //       );
        //       setUser(user);
        //     });
        //   }
        // }, []);

        return (
          <Form>
            {/* <h1>{isAddMode ? "Add User" : "Edit User"}</h1> */}
            <div className="form-row">
              <div className="form-group col-5">
                <label>Name</label>
                <Field
                  name="name"
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
              <div className="form-group col-5">
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
              </div>

              <div className="form-group col-5">
                <label>Image</label>
                <Field
                  name="image"
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
                    {img && img.image && img.image.length > 0 ? (
                      img.image.map((item, index) => {
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
