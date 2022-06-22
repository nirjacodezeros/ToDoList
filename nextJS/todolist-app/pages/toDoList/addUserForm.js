import React, {useContext, useState } from 'react'
import { UserContext } from "./userContext";


function AddUserForm(props) {
  const users = useContext(UserContext);
  const initialFormState = { id: null, name: "" };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!user.name) return;

        users.addUser(user);
        event.target.reset();
      }}
    >
      <input type="text" name="name" onChange={handleInputChange} />

      <button className="btn btn-primary">Add</button>
    </form>
  );
}
export default AddUserForm;