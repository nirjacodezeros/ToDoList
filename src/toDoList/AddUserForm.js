import React, { useState } from "react";

const AddUserForm = props => {
  const initialFormState = { id: null, name: ""};
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    console.log(event.target)
    setUser({ ...user, [name]: value });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (!user.name ) return;

        props.addUser(user);
        event.target.reset();
      }}
    >
      <input
        type="text"
        name="name"       
        onChange={handleInputChange}
      />
      
      <button>Add</button>
    </form>
  );
};

export default AddUserForm;
