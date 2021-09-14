import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TextField from "@material-ui/core/TextField";
import { useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { addUser } from "../../actions/loginaction";
import { getAllUsers } from "../../actions/usersactions";
import Permissions from "./Permissions";

function AddUser(props) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [timeOut, setTimeOut] = useState();

  const items = [
    { value: "View Subscriptions", name: "ViewSubscriptions" },
    { value: "Create Subscriptions", name: "CreateSubscriptions" },
    { value: "Delete Subscriptions", name: "DeleteSubscriptions" },
    { value: "Update Subscriptions", name: "UpdateSubscriptions" },
    { value: "View Movies", name: "ViewMovies" },
    { value: "Create Movies", name: "CreateMovies" },
    { value: "Delete Movies", name: "DeleteMovies" },
    { value: "Update Movies", name: "UpdateMovies" },
  ];

  const [checkedState, setCheckedState] = useState(
    new Array(items.length).fill(false)
  );

  const handleChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    if (
      updatedCheckedState[1] === true ||
      updatedCheckedState[2] === true ||
      updatedCheckedState[3] === true
    ) {
      updatedCheckedState[0] = true;
    }
    if (
      updatedCheckedState[5] === true ||
      updatedCheckedState[6] === true ||
      updatedCheckedState[7] === true
    ) {
      updatedCheckedState[4] = true;
    }

    setCheckedState(updatedCheckedState);
  };

  const addUsername = () => {
    return new Promise((resolve, reject) => {
      let objA = { name: userName };
      axios.post("http://localhost:9000/api/auth", objA).then((res) => {
        if (res.status === 200) {
          let validname = res.data.filter((user) => user.UserName === userName)
          validname.length > 0 ? alert('The name already exists, choose a different name') : resolve(res.data);
        } else {
          reject(res.status);
        }
      });
    });
  };

  const saveUser = async () => {
    //A.save usernaem in usersDB:
    //..1)addUser function
    await addUsername();

    //..2)getUSer function that given _id from usersDB
    let res = await axios.get("http://localhost:9000/api/auth");
    console.log(res);
    let users = res.data;
    let user = users.filter((x) => x.UserName === userName);
    console.log(user);

    //B. save details in json file:
    //..1) users.json
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const SessionTimeOut = timeOut * 10000;

    let objB = {
      _id: user[0]._id,
      FirstName: firstName,
      LastName: lastName,
      DateCreated: date,
      SessionTimeOut: SessionTimeOut,
      index: users.length
    };
    axios.post("http://localhost:9000/api/users", objB);

    //..2) permitions.json
    let permissionsArr = items
      .filter((item, index) => checkedState[index] === true)
      .map((item) => item.value);
    let permissionsObj = {
      id: user[0]._id,
      permission: permissionsArr,
    };

    axios.post("http://localhost:9000/api/permissions", permissionsObj);
    props.getAllUsers();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add User
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Add New User:"}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="first-name"
            label="First name"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="last-name"
            label="Last name"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />{" "}
          <TextField
            autoFocus
            margin="dense"
            id="user-name"
            label="User name"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="time-out"
            label="Session Time Out"
            type="number"
            onChange={(e) => setTimeOut(e.target.value)}
          />
          <Permissions
            items={items}
            handleChange={handleChange}
            checkedState={checkedState}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => saveUser()} color="primary">
            SAVE
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapDispathToProps = (state) => ({
  users: state.users.allUsers,

});

export default connect(mapDispathToProps, { getAllUsers })(AddUser);
