import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

const AddUserForm = (props) => {
  const users = useContext(UserContext);
  const initialFormState = { id: null, name: "", image: [] };
  const [user, setUser] = useState(initialFormState);
  const [img, setImg] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (event.target.files && event.target.files.length >= 1) {
      for (var i = 0; i < event.target.files.length; i++) {
        user.image.push(URL.createObjectURL(event.target.files[i]));
      }
      // setUser(URL.createObjectURL(event.target.files[0]));
    }
    setUser({ ...user, [name]: value });
    setImg(user);
  };

  function deleteFile(e) {
    user.image.splice(e, 1);
    setImg(user);
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!user.name) return;
        users.addUser(user);
        event.target.reset();
        setImg(null);
      }}
    >
      <input type="text" name="name" onChange={handleInputChange} />
      <br />
      <br />
      <input type="file" id="image" multiple onChange={handleInputChange} />
      <div className="form-group preview">
        {img && img.image && img.image.length > 0 ? (
          img.image.map((item, index) => {
            return (
              <div key={index}>
                <img src={item} alt="" width="60px" />
                <button type="button" onClick={() => deleteFile(index)}>
                  delete
                </button>
              </div>
            );
          })
        ) : (
          <img src={""} alt="" />
        )}
      </div>
      <br />
      <br />

      <button className="btn btn-primary btn-class">Add</button>
    </form>
  );
};

export default AddUserForm;
