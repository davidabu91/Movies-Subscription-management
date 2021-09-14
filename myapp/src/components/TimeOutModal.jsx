import React, { useState } from "react";
import {withRouter} from 'react-router-dom'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { lockoropenuser, unlockUser, logout } from "../actions/loginaction";



function TimeOutModal(props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));


  // const handleClickOpen = () => {
  //   setOpen(true);
  // };


  const handleClose = () => {
    
    // props.handleShowLockUser()
    props.unlockUser()
    props.lockoropenuser(50000,true)
    // props.timer()
  };


  const handleLogin = () => {
    if(password === props.currentUser.Password){
      handleClose()
    } else{setError('Invalid password')} 
  }

const handleLogout = async () => {
  await props.history.push("/");
  props.logout();
}

let name;
props.currentUser.FirstName ? name = props.currentUser.FirstName : name = '';

  return (
    <div>

      <Dialog
        // fullScreen={fullScreen}
        open={props.lockuser}
        // onClose={handleLogin}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"your session over, pls Sign In"}
        </DialogTitle>
        <DialogContent>
         
          <TextField
            autoFocus
            margin="dense"
            id="first-name"
            // label={props.currentUser.firstName}
            value={name}
            type="text"
            // onChange={(e) => setFirstName(e.target.value)}
          />
        
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
             <Typography component="h5" variant="h8" color="error">
            {error}
          </Typography>
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleLogin} color="primary">
            STAY HERE
          </Button>
          <Button  color="primary" autoFocus onClick={handleLogout}>
            LOGOUT
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapDispathToProps = (state) => ({
  currentUser: state.auth.currentUser,
  lockuser: state.auth.lockuser

});

export default withRouter(connect(mapDispathToProps,{lockoropenuser,logout, unlockUser})(TimeOutModal));
