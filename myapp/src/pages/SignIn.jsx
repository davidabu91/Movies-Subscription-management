import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { validUser, unlockUser} from "../actions/loginaction";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.linkedin.com/in/david-abou-5b8972163" to='https://www.linkedin.com/in/david-abou-5b8972163'>
        David Abou{' '}
      </Link>
      {new Date().getFullYear()} {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#8FBC8F",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:"#5F9EA0"
  },
}));

const herukoAutUrl = "https://cinema-ws.herokuapp.com/api/auth"
const herukoPermissionsUrl = "https://cinema-ws.herokuapp.com/api/permissions"
const herukoUsersUrl = "https://cinema-ws.herokuapp.com/api/users"

function SignIn(props) {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [displayErr, setDisplayErr] = useState("");

  const getUser = async () => {
    let res = await axios(herukoUsersUrl || "http://localhost:9000/api/users");
    let currentUser;
    try {
      let user = res.data.filter((user) => user.FirstName === name);
      if (user.length > 0) {
        currentUser = user[0];
        return currentUser
      } else {
        setDisplayErr("UserName is not exsist");
      }
    } catch (err) {
      setDisplayErr("Error requesting server, Check your internet connection");
      return
    }
  };

  const handleSubmit = () => {
    !props.isLogedIn ? onsubmit() : logIn(props.currentUser)
  }

  const logIn = (obj) => {          
    props.validUser(obj);
    props.history.push(`mainpage/${name}`);
  }


  const getPermissions = (id) => {
    return new Promise((resolve, reject) => {
      axios(herukoPermissionsUrl || `http://localhost:9000/api/permissions/${id}`).then(res => resolve(res.data)).catch(err => {
        if(err){
          console.log('err')
        }
      })
    })
  }
    


  onsubmit = async () => {
    let res = await axios.get(herukoAutUrl || "http://localhost:9000/api/auth");
    if (res.status === 200) {
      let users = res.data;
      let validname = users.filter((user) => user.UserName === name);
      if (validname.length > 0) {
        if (validname[0].Password === password) {
          let obj = await getUser();
          let arrPermissions = await getPermissions(obj._id)
          let user = {
            ...obj,...validname[0],arrPermissions
          }
          logIn(user)
        } else {
          setDisplayErr(
            "The password does not match the username, try again or Sing Up"
          );
        }
      } else {
        setDisplayErr("UserName is not exsist");
      }
    }else {
      console.log('res')
    }
  };

  const classes = useStyles();



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>{" "}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>{" "}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography component="h5" variant="h5" color="error">
            {displayErr}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={!name || !password}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  lockuser: state.auth.lockuser,
  isLogedIn: state.auth.isLogedIn
});

export default connect(mapStateToProps, { validUser, unlockUser })(SignIn);
