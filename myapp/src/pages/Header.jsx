

import React from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { logout } from "../actions/loginaction";
import TimeOutModal from "../components/TimeOutModal";



const headersData = [
  {
    label: "Movies",
    href: "/moviespage",
  },
  {
    label: "Subscriptions",
    href: "/subscriptions",
  },
  {
    label: "Users Management",
    href: "/management",
  },
  {
    label: "Log Out",
    href: "/logout",
  },
];
const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#5F9EA0",
    paddingRight: "79px",
    paddingLeft: "118px",
    position: "sticky",
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    // display: "flex",
    justifyContent: "space-between",
  },
}));

function Header(props) { 
  const { header, logo, menuButton, toolbar } = useStyles();

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {femmecubatorLogo}
        <div> {getMenuButtons()}
        
        </div>
      </Toolbar>
    );
  };

  const femmecubatorLogo = (
    
    <Typography variant="h6" component="h1" className={logo}>
      {props.auth.isLogedIn
        ? `Hello ${props.auth.currentUser.FirstName}`
        : "Hello Guest"}
    </Typography>
  );



  const getMenuButtons = () => {
    
    if (props.auth.isLogedIn) {
      if (props.auth.currentUser.FirstName === "Admin") {
        return headersData.map(({ label, href }) => {
          return (
            <Button
              {...{
                className: { menuButton },
                key: label,
                color: "inherit",
                to: `/mainpage/${props.auth.currentUser.FirstName}${href}`,
                // to: `/mainpage${href}`,
                component: RouterLink,

              }}
            >
              {label}
            </Button>
          );
        });
      } else {
        return headersData
          .filter((x) => x.label !== "Users Management")
          .map(({ label, href }) => {
            return (
              <Button
                {...{
                  className: { menuButton },
                  key: label,
                  color: "inherit",
                  to: `/mainpage/${props.auth.currentUser.FirstName}${href}`,
                  // to: `/mainpage${href}`,
                  component: RouterLink,
                }}
              >
                {label}
              </Button>
            );
          });
      }
    } else {
      return null;
    }
  };

  return <AppBar className={header}>{displayDesktop()}</AppBar>;
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps,{logout})(Header);
