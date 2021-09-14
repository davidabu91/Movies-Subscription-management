import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { lockoropenuser } from "../actions/loginaction";
import {getAllUsers} from '../actions/usersactions'
import {getAllMovies} from '../actions/moviesaction'


function MainPage(props) {

  // useEffect(() => {
  //   props.lockoropenuser(props.SessionTimeOut,true);
  // },[]);

  useEffect(()=>{
    props.getAllUsers()
  })

  useEffect(()=>{
    props.getAllMovies()
  })

  return (
    <div >
      <h3>Main Page</h3>
    </div>
  );
}

const mapStateToProps = (state) => ({
  SessionTimeOut: state.auth.currentUser.SessionTimeOut,
  isLogedIn: state.auth.isLogedIn,
  lockuser: state.auth.lockuser

});

export default connect(mapStateToProps, { lockoropenuser, getAllUsers, getAllMovies })(MainPage);
