import React from "react";
import { Button } from "@material-ui/core";
import { logout } from "../actions/loginaction";
import { connect } from "react-redux";

function LogOut (props) {
  function onclicklogout ()  {
      
    let obj = {
      name: props.auth.currentUser.name,
      password: props.auth.currentUser.password,
    };
    props.logout();
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

export default connect(mapStateToProps, { logout })(LogOut);
