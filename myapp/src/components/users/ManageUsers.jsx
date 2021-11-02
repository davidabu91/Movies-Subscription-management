import React from "react";
import { connect } from "react-redux";
import { getAllUsers } from "../../actions/usersactions";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import AddUser from "./AddUser";
import User from "./User";



const useStyles = makeStyles({
  root: {
   
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",

  },
 
});

function ManageUsers(props) {


  const users = props.users;

  const herukoAutUrl = "https://cinema-ws.herokuapp.com/api/auth"
  const herukoPermissionsUrl = "https://cinema-ws.herokuapp.com/api/permissions"
  const herukoUsersUrl = "https://cinema-ws.herokuapp.com/api/users"


  async function deleteUser(id) {
    await axios.delete(herukoPermissionsUrl+'/'+id ||`http://localhost:9000/api/permissions/${id}`);
    await axios.delete(herukoUsersUrl+'/'+id ||`http://localhost:9000/api/users/${id}`);
    await axios.delete(herukoAutUrl+'/'+id || `http://localhost:9000/api/auth/${id}`);
    props.getAllUsers();
  }

  const classes = useStyles();


  return (
    <div >
      <h3>ManageUsers</h3>
      <div className={classes.root}>
      {users.map((item) => {
        return <User key={item._id} item={item} deleteUser={deleteUser}/>;
      })}
      </div>
      <AddUser getAllUsers={props.getAllUsers}/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  users: state.users.allUsers,
});

export default connect(mapStateToProps, { getAllUsers })(ManageUsers);
