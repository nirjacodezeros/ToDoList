// import logo from './logo.svg';

import "./App.css";

import React, { createContext, useContext, useState } from "react";

import UserData from "./toDoList/UserData";
import CheckBox from "./components/CheckBox";



function App() {
  

  return (
    <div className="App">
      <div className="flex-row">
          <UserData/>
          {/* <CheckBox/> */}
      </div>
      
      <br />
     
    </div>
    
  );
}

export default App;
