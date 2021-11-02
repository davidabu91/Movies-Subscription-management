import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";




const useStyles = makeStyles({
  root: {
    border: "1px solid",
    borderRadius: "10px",
    padding: "10px 20px",
    width: "70%",
    marginTop: "20px",
    boxShadow: "0 5px 20px 1px rgba(0, 0, 0, 0.5)",  },
  btn: {
    fontSize: 14,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  pos: {
    marginBottom: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,

  },
  container:{
    border: "1px solid #2F4F4F",
    borderRadius: "10px",

    backgroundColor: "#F8F8FF",
    width: "100%",

  },
  p:{
    marginLeft:"20px"
  }
});

export default function Movie({ item,deleteMovie }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>

      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {item.Name + "," + item.Premiered.substr(0, 4)}
        </Typography>

        <Typography className={classes.pos} color="textSecondary">
          {`Genres: ${item.Genres}`}
        </Typography>
        <Container className={classes.container}>
        <Typography className={classes.pos} color="textSecondary">
          <img src={item.Image.medium} alt="" width="100" />
         <p className={classes.p}> Subscriptions wotched: <br/> {item.Genres.map((el,index) => {
           return <li key={index}><Link>{el}</Link></li>
         })}</p>
        </Typography>
        </Container>
      </CardContent>

      <CardActions className={classes.btn}>
        <Button >Edit</Button>
        <Button onClick={()=>deleteMovie(item._id)} >Delete</Button>
      </CardActions>

    </Card>
  );
}
