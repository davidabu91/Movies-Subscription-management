import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

// const items = [
//   { value: "View Subscriptions", name: "ViewSubscriptions" },
//   { value: "Create Subscriptions", name: "CreateSubscriptions" },
//   { value: "Delete Subscriptions", name: "DeleteSubscriptions" },
//   { value: "Update Subscriptions", name: "UpdateSubscriptions" },
//   { value: "View Movies", name: "ViewMovies" },
//   { value: "Create Movies", name: "CreateMovies" },
//   { value: "Delete Movies", name: "DeleteMovies" },
//   { value: "Update Movies", name: "UpdateMovies" },
// ];

export default function Permissions(props) {
  const classes = useStyles();

  // const [checkedState, setCheckedState] = useState(
  //   new Array(items.length).fill(false)
  // );

//   const [ViewSubscriptions, setViewSubscriptions] = useState(false);
//   const [CreateSubscriptions, setCreateSubscriptions] = useState(false);
//   const [DeleteSubscriptions, setDeleteSubscriptions] = useState(false);
//   const [UpdateSubscriptions, setUpdateSubscriptions] = useState(false);
//   const [ViewMovies, setViewMovies] = useState(false);
//   const [CreateMovies, setCreateMovies] = useState(false);
//   const [DeleteMovies, setDeleteMovies] = useState(false);
//   const [UpdateMovies, setUpdateMovies] = useState(false);

  // const handleChange = (position) => {

  //   const updatedCheckedState = checkedState.map((item, index) => 
  //     index === position ? !item : item
  //   );

  //   if(updatedCheckedState[1] === true || updatedCheckedState[2] === true || updatedCheckedState[3] === true) {
  //       updatedCheckedState[0] = true
  //   }  
  //   if (updatedCheckedState[5] === true || updatedCheckedState[6] === true || updatedCheckedState[7] === true) {
  //       updatedCheckedState[4] = true
  //   }
    

  //   setCheckedState(updatedCheckedState);
  // };


  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">PERMITIONS:</FormLabel>
        <FormGroup>
          {props.items.map((item, index) => {
            return (
              <FormControlLabel
                control={
                  <input
                    type="checkbox"
                    id={item.name}
                    name={item.name}
                    value={item.name}
                    checked={props.checkedState[index]}
                    onChange={()=>props.handleChange(index)}
                  />
                }
                label={item.value}
                key={index}
              />
            );
          })}
          {/* <FormControlLabel
            control={
              <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
            }
            label="Gilad Gray"
          />
          <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label="Jason Killian"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={antoine}
                onChange={handleChange}
                name="antoine"
              />
            }
            label="Antoine Llorca"
          /> */}
        </FormGroup>
        {/* <FormHelperText>Be careful</FormHelperText> */}
      </FormControl>
      {/* <FormControl
        required
        error={error}
        component="fieldset"
        className={classes.formControl}
      >
        <FormLabel component="legend">Pick two</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
            }
            label="Gilad Gray"
          />
          <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label="Jason Killian"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={antoine}
                onChange={handleChange}
                name="antoine"
              />
            }
            label="Antoine Llorca"
          />
        </FormGroup>
        <FormHelperText>You can display an error</FormHelperText>
      </FormControl> */}
    </div>
  );
}
