import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Avatar } from "@material-ui/core";
import "./Header.css";
import Headings from "../../../Utils/Headings";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { useSelector } from "react-redux";
import { logout } from "../../../Redux/DispatchFuncitons/AuthFunctions";
import { useDispatch } from "react-redux";
import Notification from "../../Notifications/Notification";
import Popup from "../Popups/Popup";
import UserProfile from "../../../Components/UserPorfile/UserProfile";

export default function Header(props) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const Auth = useSelector((state) => state.Auth);
  const [useiinfopopup, setuserInfopopup] = useState(false);
  const [showPopup, toggleShowPopup] = useState(false);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    if (Auth.isExpired === true) {
      dispatch(logout());
    }
  }, [Auth.isExpired]);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          setuserInfopopup(true);
        }}
      >
        <IconButton
          aria-label="show 4 new mails"
          color="inherit"
          className="p-0"
        >
          {Auth.Profile === "" ? (
            <AccountCircle />
          ) : (
            <Avatar alt="Profile Picture" src={Auth.Profile} />
          )}
        </IconButton>
        <span className="menu-option">Profile</span>
      </MenuItem>
      {props.showextra === true ? (
        <MenuItem
          onClick={() => {
            handleMenuClose(true);
            toggleShowPopup(true);
          }}
        >
          <IconButton
            aria-label="show 4 new mails"
            color="inherit"
            className="p-0"
          >
            <NotificationsIcon />
          </IconButton>
          <span className="menu-option">Notification</span>
        </MenuItem>
      ) : (
        <div></div>
      )}
      {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <SearchIcon className="search-button" />
        </IconButton>
        <p>Search</p>
      </MenuItem> */}
      <MenuItem
        onClick={(e) => {
          handleProfileMenuOpen(e);
          dispatch(logout());
        }}
      >
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          className="p-0"
        >
          <PowerSettingsNewIcon color="secondary" className="search-button" />
        </IconButton>
        <span className="menu-option">Logout</span>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={props.ismobile !== undefined ? props.ismobile : "grow"}>
      <Popup
        component={UserProfile}
        toggleShowPopup={setuserInfopopup}
        showPopup={useiinfopopup}
      />
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton
            edge="start"
            className="menuButton"
            color="inherit"
            aria-label="open drawer"
          ></IconButton>

          <Headings url={props.url} />

          <div className="grow" />
          <div className="sectionDesktop">
            {Auth.isLoggedIn === true ? (
              <>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  color="inherit"
                  className="Nav-icon"
                  onClick={() => {
                    setuserInfopopup(true);
                  }}
                >
                  {Auth.Profile === "" ? (
                    <AccountCircle />
                  ) : (
                    <Avatar alt="Profile Picture" src={Auth.Profile} />
                  )}
                </IconButton>
                <IconButton
                  aria-label="show 4 new mails"
                  color="inherit"
                  className="Nav-icon"
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  <PowerSettingsNewIcon color="secondary" />
                </IconButton>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="sectionMobile">
            <IconButton
              style={{ padding: "inherit" }}
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <Avatar alt="Profile Picture" src={Auth.Profile} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {Auth.isLoggedIn === true ? renderMobileMenu : <></>}
      {Auth.isLoggedIn === true ? renderMenu : <></>}
      <Popup
        toggleShowPopup={toggleShowPopup}
        showPopup={showPopup}
        component={Notification}
      />
    </div>
  );
}
