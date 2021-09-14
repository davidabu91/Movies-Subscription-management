import React, { useState, useEffect } from "react";
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

function EditUser(props) {
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
  const [DateCreated, setDateCreated] = useState("");
  const [userId, setUserId] = useState("");
  const [checkedState, setCheckedState] = useState([]);


  const permissionsItems = [
    { value: "View Subscriptions", name: "ViewSubscriptions" },
    { value: "Create Subscriptions", name: "CreateSubscriptions" },
    { value: "Delete Subscriptions", name: "DeleteSubscriptions" },
    { value: "Update Subscriptions", name: "UpdateSubscriptions" },
    { value: "View Movies", name: "ViewMovies" },
    { value: "Create Movies", name: "CreateMovies" },
    { value: "Delete Movies", name: "DeleteMovies" },
    { value: "Update Movies", name: "UpdateMovies" },
  ];

  useEffect(() => {
    setFirstName(props.item.FirstName);
    setLastName(props.item.LastName);
    setUserName(props.item.FirstName);
    setTimeOut(props.item.SessionTimeOut);
    setDateCreated(props.item.DateCreated);
    setUserId(props.item._id);
    setCheckedState([...props.checkedPermissions])
  }, [props.checkedPermissions, props.item.DateCreated, props.item.FirstName, props.item.LastName, props.item.SessionTimeOut, props.item._id]);


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

  const updateUsername = (password) => {
    return new Promise((resolve, reject) => {
      let objA = { name: userName, password: password };
      axios.put(`http://localhost:9000/api/auth/${userId}`, objA).then(res => {
        if(res.status === 200){
          resolve(res.data)
        } else{
        reject(res.status)
        }
      })
    })
  }

  const updateUser = () => {
    return new Promise((resolve, reject) => {
      let SessionTimeOut = timeOut * 10000;

      let obj = {
        _id: userId,
        FirstName: firstName,
        LastName: lastName,
        DateCreated: DateCreated,
        SessionTimeOut: SessionTimeOut,
        index: props.item.index
      };
      axios
        .put(`http://localhost:9000/api/users/${userId}`, obj)
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.status);
          }
        });
    });
  };

  const updatePermissions = () => {
    return new Promise((resolve,reject) => {
      let permissionsArr = permissionsItems
      .filter((item, index) => checkedState[index] === true)
      .map((item) => item.value);
    let obj = {
      id: props.item._id,
      permission: permissionsArr,
    };

     axios.put(
      `http://localhost:9000/api/permissions/${userId}`,
      obj
    ).then(res => {
      if (res.status === 200) {
        resolve(res.data);
      } else {
        reject(res.status);
      }
    })
    })
  }


  const editUser = async () => {
    let authData = await axios.get(`http://localhost:9000/api/auth/${userId}`);
    // console.log(authData.data.Password);
    await updateUsername(authData.data.Password);
    await updateUser();
    await updatePermissions();
    //A.save usernaem in usersDB:
    //..1)addUser function
    // await addUsername()

    //..2)getUSer function that given _id from usersDB
    // let res = await axios.get("http://localhost:9000/api/auth");
    // console.log(res);
    // let users = res.data;
    // let user = users.filter((x) => x.UserName === userName);
    // console.log(user);

    //B. save details in json file:
    //..1) users.json

    // let objB = {
    //   _id: props.item._id,
    //   FirstName: firstName,
    //   LastName: lastName,
    //   DateCreated: DateCreated,
    //   SessionTimeOut: timeOut,
    // };
    // let res = await axios.put(
    //   `http://localhost:9000/api/users/${userId}`,
    //   objB
    // );

    //..2) permitions.json
    // let permissionsArr = permissionsItems
    //   .filter((item, index) => checkedState[index] === true)
    //   .map((item) => item.value);
    // let permissionsObj = {
    //   _id: props.item._id,
    //   permission: permissionsArr,
    // };

    // await axios.put(
    //   `http://localhost:9000/api/permissions/${userId}`,
    //   permissionsObj
    // );
    props.getAllUsers();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const SessionTimeOut = props.item.SessionTimeOut / 1000;

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        // fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Edit User:"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="first-name"
            label={"First name: " + props.item.FirstName}
            type="text"
            placeholder={props.item.FirstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="last-name"
            label={"Last name: " + props.item.LastName}
            type="text"
            placeholder={props.item.LastName}
            onChange={(e) => setLastName(e.target.value)}
          />{" "}
          <TextField
            autoFocus
            margin="dense"
            id="user-name"
            label={"User name: " + props.item.FirstName}
            type="text"
            placeholder={props.item.FirstName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="time-out"
            label={`Session Time Out: ${SessionTimeOut}`}
            type="number"
            placeholder={SessionTimeOut}
            onChange={(e) => setTimeOut(e.target.value)}
          />
          <Permissions
            items={permissionsItems}
            handleChange={handleChange}
            checkedState={checkedState}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => editUser()} color="primary">
            EDIT
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
  admin: state.auth.currentUser,
});

export default connect(mapDispathToProps, { addUser, getAllUsers })(EditUser);
