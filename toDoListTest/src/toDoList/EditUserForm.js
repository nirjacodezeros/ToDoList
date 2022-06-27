import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

const EditUserForm = (props) => {
  const users = useContext(UserContext);
  const [user, setUser] = useState(users.currentUser);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (event.target.files && event.target.files.length >= 1) {
      for (var i = 0; i < event.target.files.length; i++) {
        user.image.push(URL.createObjectURL(event.target.files[i]));
      }
      // setUser(URL.createObjectURL(event.target.files[0]));
    }
    setUser({ ...user, [name]: value });
  };

  function deleteFile(e) {
    user.image.splice(e, 1);
    setUser({ ...user });
  }

  useEffect(() => {
    setUser(users.currentUser);
  }, [users]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        users.updateUser(user.id, user);
      }}
    >
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleInputChange}
      />
      <br />
      <br />
      <input type="file" id="image" multiple onChange={handleInputChange} />
      <div className="form-group preview">
        {user.image.length > 0 &&
          user.image.map((item, index) => {
            return (
              <div key={item}>
                <img src={item} alt="" width="60px"/>
                <button type="button" onClick={() => deleteFile(index)}>
                  delete
                </button>
              </div>
            );
          })}
      </div>
      <br/>
      <br/>
      <button>Update </button>
      <button
        onClick={() => users.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditUserForm;
