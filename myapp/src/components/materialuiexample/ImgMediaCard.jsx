import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

// import waveImg from "./wave.png";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: "100px"
  }
});

export default function ImgMediaCard(item) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
              <Typography gutterBottom variant="h5" component="h2">
          CardMedia Example
        </Typography>
      <CardMedia
        className={classes.media}
        // image={waveImg}
        title="Paella dish"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          CardMedia Example
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          The CardMedia component sets a background image to cover available
          space.
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {item.Name} 
        </Typography>

        <Typography className={classes.pos} color="textSecondary">
          {`Geners: ${item.Geners}`}
        </Typography>
        <img src="" alt="" />
        <Typography className={classes.pos} color="textSecondary">
          {`Subscriptions wotched: ${item.Geners}`}
        </Typography>
      </CardContent>
    </Card>
  );
}
