import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import img from '../assets/images/bg-app.jpg'
import { connect } from "react-redux";
import { lockoropenuser } from "../actions/loginaction";
import {getAllUsers} from '../actions/usersactions'
import {getAllMovies} from '../actions/moviesaction'

const Content = styled.div`
border: 1px solid #000;
`


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
      <Content/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  SessionTimeOut: state.auth.currentUser.SessionTimeOut,
  isLogedIn: state.auth.isLogedIn,
  lockuser: state.auth.lockuser

});

export default connect(mapStateToProps, { lockoropenuser, getAllUsers, getAllMovies })(MainPage);
