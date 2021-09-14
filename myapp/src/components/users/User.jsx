import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EditUser from './EditUser';
// import { connect } from "react-redux";
// import {deleteUsers} from '../actions/usersactions'


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  //   bullet: {
  //     display: 'inline-block',
  //     margin: '0 2px',
  //     transform: 'scale(0.8)',
  //   },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function User({ item, deleteUser }) {
  useEffect(() => {
    axios(`http://localhost:9000/api/permissions/${item._id}`).then((res) => {
      setPermission(res.data.permission);
      let checked = [];
      
      arrPermissions.map((item) => {
        res.data.permission.includes(item) ? checked.push(true) : checked.push(false)
      });
      setCheckedPermissions(checked)
    });
  }, [item]);

  const [checkedPermissions, setCheckedPermissions] = useState([])


  const arrPermissions = [
    'View Subscriptions',
    'Create Subscriptions',
    'Delete Subscriptions',
    'Update Subscriptions',
    'View Movies',
    'Create Movies',
    'Delete Movies',
    'Update Movies'
  ]
  
  const [permissions, setPermission] = useState([]);
  const classes = useStyles();
  //   const bull = <span className={classes.bullet}>•</span>;
  const SessionTimeOut = item.SessionTimeOut / 10000;
  const onDeleteClick = () => {
    deleteUser(item._id);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {`${item.FirstName} ${item.LastName}`}
        </Typography>

        <Typography className={classes.pos} color="textSecondary">
          {`Session Time Out (Minutes) : ${SessionTimeOut}`}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {`Created date : ${item.DateCreated}`}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {`permissions : ${permissions}`}
        </Typography>
 
      </CardContent>
      <CardActions>

        <Button size="small"><EditUser item={item} permissions={permissions} checkedPermissions={checkedPermissions}/></Button>
        <Button size="small" onClick={onDeleteClick}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

// const mapStateToProps = (state) => ({
//   users: state.users.allUsers,
// });

// export default connect(mapStateToProps, { deleteUsers })(User);
