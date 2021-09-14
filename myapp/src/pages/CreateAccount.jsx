import React, {useState} from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { connect } from "react-redux";
import { validUser } from "../actions/loginaction";


  function CreateAccount(props) {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <div>
      <h3> Create Account </h3>
      
      <Form>
        <FormGroup>
          <Label for="name"> Name </Label>
          <Input
            type="string"
            name="name"
            id="name"
            placeholder="Your Name..."
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Password"> Password </Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password "
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button onClick={onsubmit}> Create </Button>
        </Form>
    </div>
  );
}

export default connect( validUser )(CreateAccount);
