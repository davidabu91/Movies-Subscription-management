import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Movie from './Movie';
import {deleteMovie} from "../../actions/moviesaction"

const useStyles = makeStyles({
    root: {
     
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
  
    },
   
  });

function AllMovies(props){

    const classes = useStyles();


    return (

        
        <div className={classes.root}>
            {props.movies.map((item)=>{
                return <Movie key={item._id} item={item} deleteMovie={props.deleteMovie}/>
            })}
        </div>
    )
}

const mapStateToProps = (state) => ({
    movies: state.movies.allMovies,
  });
  
  export default connect(mapStateToProps,{deleteMovie})(AllMovies);
  