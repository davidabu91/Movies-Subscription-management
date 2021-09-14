import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { validUser } from "../actions/loginaction";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {" "}
      {"Copyright © "}{" "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website{" "}
      </Link>{" "}
      {new Date().getFullYear()} {"."}{" "}
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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [display, setDisplay] = useState('none')


  onsubmit = async () => {
    let res = await axios("http://localhost:9000/api/auth");
    let users = res.data;
    console.log(users);
    let validname = users.filter((user) => user.UserName === name);
    if (validname.length > 0 ) {
      let obj = {
        name: name,
        password: password,
      };
      let id = validname[0]._id
      axios.put('http://localhost:9000/api/auth/'+id, obj)
      .then(props.history.push('/'))
    } else {
      alert("Name not exist ");
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
          Sign up
        </Typography>{" "}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="name (that you received from the admine)"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
          <div style={{display:display}}>
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
          </div>
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onsubmit}
          >
            Sign Up{" "}
          </Button>{" "}
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password ?
              </Link>{" "}
            </Grid>{" "} */}
            <Grid item>
              <Link to="/" variant="body2">
                {" "}
                {"You have an account? Sign In"}{" "}
              </Link>{" "}
            </Grid>{" "}
          </Grid>{" "}
        </form>{" "}
      </div>{" "}
      <Box mt={8}>
        <Copyright />
      </Box>{" "}
    </Container>
  );
}

const mapStateToProps = (state) => ({
  // users: state.users,
});

export default connect(mapStateToProps, { validUser })(SignUp);
