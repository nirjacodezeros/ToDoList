import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUserForm = (props) => {
  const navigate = useNavigate();
  const initialFormState = { id: null, name: "" };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target);
    setUser({ ...user, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!user.name ) return;

        props.addUser(user);
        navigate("/");
      }}
    >
      <div className="App">
        <h1>Add User</h1>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" onChange={handleInputChange} />
        </div>
      </div>

      <button>Add new user</button>
    </form>
  );
};

export default AddUserForm;
