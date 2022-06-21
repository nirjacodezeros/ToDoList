// import "../../App.css";

import { useState } from "react";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";
import { UserProvider } from "./UserContext";
import UserTable from "./UserTable";


function UserData() {
  const usersData = [
    { id: 1, name: "React" },
    { id: 2, name: "Angular" },
    { id: 3, name: "Rust" },
  ];

  const initialFormState = { id: null, name: "" };

  const [users, setUsers] = useState(usersData);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialFormState);

  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    setEditing(false);
    setUsers(users.filter((user) => user.id !== id));
  };

  const editRow = (user) => {
    setEditing(true);
    setCurrentUser({ id: user.id, name: user.name });
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };

  return (
    <div className="App">
      <div className="flex-row">
        {/* start using context */}
        <UserProvider value={{users,addUser,editRow,deleteUser,editing,setEditing,currentUser,updateUser}} >
          <div className="flex-large">
            {editing ? (
              <div>
                <h2>Edit</h2>
                <EditUserForm
                  
                />
              </div>
            ) : (
              <div>
                <h2>Add</h2>
                <AddUserForm  />
              </div>
            )}
          </div>
          <br />
          <br />
          <div className="flex-large">
            <h1>List</h1>
            <UserTable  />
          </div>
        </UserProvider>
        {/* end using context */}

        {/* start using props */}
        {/* <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <br />
        <br />
        <div className="flex-large">
          <h1>List</h1>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div> */}
        {/* end using props */}
      </div>
    </div>
  );
}

export default UserData;
