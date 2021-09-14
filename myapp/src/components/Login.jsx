
import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { validUser } from "../actions/loginaction";
import PropTypes from "prop-types";

function Login(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  onsubmit = async () => {
    let res = await axios("http://localhost:9000/api/auth");
    let users = res.data;
    let validname = users.filter((user) => user.UserName === name);
    let validpassword = users.filter((user) => user.Password === password);
    if (validname.length > 0 && validpassword.length > 0) {
      let obj = {
        name: name,
        password: password,
      };
      props.validUser(obj);
      props.history.push(`mainpage/${password}/${name}`);
    } else {
      alert("Name Or Password");
    }
  };

  return (
    <div>
      <h3> Login </h3>
      <Form>
        <FormGroup>
          <Label for="name">  </Label>
          <Input
            type="string"
            name="name"
            id="name"
            placeholder="Your Name..."
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Password">  </Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password "
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button onClick={onsubmit}> Login </Button>{" "}
        <div style={{margin: '15px'}}>
        <span></span>
        <Button><Link  style={{ textDecoration: 'none', color: 'white' }} to='createaccount'>New User?</Link></Button></div>
      </Form>
    </div>
  );
}

Login.propTypes = {
  validUser: PropTypes.func.isRequired,
  // getUser: PropTypes.func.isRequired,
  // users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // users: state.users,
});

export default connect(mapStateToProps, { validUser })(Login);
