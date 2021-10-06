import React, { useState, useEffect } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import * as _ from "lodash";
export default function UserDataUrl(props) {
  const [User, setUser] = useState({});
  const GuestList = useSelector(state => state.GuestList)
  const Auth = useSelector(state => state.Auth);

  useEffect(async () => {
    if (props.Phone !== "" && props.Phone !== undefined && props.Phone !== null) {
      if (Auth.Phone === props.Phone) {
        await setUser({ Name: Auth.Name, Pic: Auth.Profile });
      } else {
        let i = _.findLastIndex(GuestList, function (o) { return o.Phone == props.Phone; });
        if (i !== -1) {
          //  console.log(GuestList[i])
          await setUser(GuestList[i])
        }
        else {
          await setUser({ Name: props.Phone, Pic: "" })
        }
      }
    }
  }, [props.Phone, GuestList]);

  return (
    <>
      {props.showIcon === true ? (
        User.Pic !== undefined && User.Pic !== "" ? (
          <Avatar alt="Profile Picture" src={User.Pic} />
        ) : (
          <AccountCircle style={{ height: "40px", width: "40px" }} />
        )
      ) : (
        <></>
      )}
      {props.showName && props.showName === true ? (
        <span className="name" style={{fontSize: "15px"}}>
          {User.Name === undefined || User.Name === ""
            ? props.Phone
            : User.Name}
        </span>
      ) : (
        <span className="name"></span>
      )}
    </>
  );
}
