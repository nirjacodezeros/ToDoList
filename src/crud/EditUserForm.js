import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditUserForm = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const data = props.users.filter((user) => user.id == params.id);
  const [user, setUser] = useState(data[0]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    setUser(data[0]);
  }, [data[0]]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        props.updateUser(user.id, user);
        navigate("/");
      }}
    >
      <div className="App">
        <br />
        <br />

        <h1>Edit User</h1>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button>Update user</button>
        </div>
      </div>
      {/* <button
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </button> */}
    </form>
  );
};

export default EditUserForm;
