import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllUsers } from "../../actions/usersactions";
import axios from "axios";
import AddUser from "./AddUser";
import User from "./User";

function ManageUsers(props) {


  const users = props.users;

  async function deleteUser(id) {
    await axios.delete(`http://localhost:9000/api/permissions/${id}`);
    await axios.delete(`http://localhost:9000/api/users/${id}`);
    await axios.delete(`http://localhost:9000/api/auth/${id}`);
    props.getAllUsers();
  }

  return (
    <div>
      <h3>ManageUsers</h3>
      {users.map((item) => {
        return <User key={item._id} item={item} deleteUser={deleteUser}/>;
      })}
      <AddUser getAllUsers={props.getAllUsers}/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  users: state.users.allUsers,
});

export default connect(mapStateToProps, { getAllUsers })(ManageUsers);
