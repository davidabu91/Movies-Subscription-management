import React from "react";
import { Button } from "@material-ui/core";
import { logout } from "../actions/loginaction";
import { setEmptyUsersState } from "../actions/usersactions";
import { setEmptyMoviesState } from "../actions/moviesaction";
import { connect } from "react-redux";

function LogOut (props) {
  function onclicklogout ()  {
      
  
    props.logout();
    props.setEmptyMoviesState();
    props.setEmptyUsersState();
    props.history.push("/");
    console.log(props.history)
  };

  return (
    <div>
        
      <Button onClick={onclicklogout}>Log Out</Button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, setEmptyUsersState, setEmptyMoviesState })(LogOut);
