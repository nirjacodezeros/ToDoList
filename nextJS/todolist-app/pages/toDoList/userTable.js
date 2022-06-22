import React, { useContext } from 'react'
import { UserContext } from './userContext';
//import styles from '../../styles/globals.css'
// import Button from "./Button.module.css"

const UserTable = (props) => {
  const users = useContext(UserContext);
  return (
    <div>
      <table className="table table-striped ">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* start using context */}
          {users.users.length > 0 ? (
            users.users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>
                  <button
                    onClick={() => {
                      users.editRow(user);
                    }}
                    className="btn btn-info btn-class"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => users.deleteUser(user.id)}
                   className="btn btn-danger btn-class"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No users</td>
            </tr>
          )}
          {/* end using context */}

          
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;