import React, { useState, useEffect,useContext } from "react";
import { UserContext } from "./UserContext";


const EditUserForm = (props) => {
  const users = useContext(UserContext);
  const [user, setUser] = useState(users.currentUser);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

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
