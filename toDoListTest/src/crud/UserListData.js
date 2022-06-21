import List from "./List";
import Edit from "./Edit";
import Add from "./Add";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";
import UserTable from "./UserTable";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function UserListData() {

  const usersData = [
    { id: 1, name: "React" },
    { id: 2, name: "Angular" },
    { id: 3, name: "Rust" },
  ];

  const [users, setUsers] = useState(usersData);

  const editRow = (user) => {
    // setEditing(true);
    setCurrentUser({ id: user.id, name: user.name });
  };

  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    // setEditing(false);
    setUsers(users.filter((user) => user.id !== id));
  };

  
  const updateUser = (id, updatedUser) => {
    // setEditing(false);
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<UserTable users={users} deleteUser={deleteUser} />}
          />
          <Route path="/add" element={<AddUserForm addUser={addUser} />} />
          <Route
            path="/edit/:id"
            element={<EditUserForm users={users} updateUser={updateUser} />}
          />
        </Routes>
      </Router>
      <br />
      <div className="flex-large">
        <h2>View users</h2>
        <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
      </div>
    </div>
    // <div className="App">
    //  <Router>
    //   <Routes>
    //     <Route path='/' element={<List/>}/>
    //     <Route path='/add' element={<Add/>}/>
    //     <Route path='/edit/:id' element={<Edit/>}/>
    //   </Routes>
    // </Router>
    // </div>
  );
}

export default UserListData;
