import React, { useContext } from 'react'
import { UserContext } from './userContext';


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
                    className="button muted-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => users.deleteUser(user.id)}
                    className="button muted-button"
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