import React from "react";
import { connect } from "react-redux";
import Movie from './Movie';
import {deleteMovie} from "../../actions/moviesaction"

// import './style.css'


function AllMovies(props){

    return (

        
        <div className='moviesContainer'>
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
  