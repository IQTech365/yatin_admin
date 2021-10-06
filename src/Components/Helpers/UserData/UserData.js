import React, { useState, useEffect } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch, useSelector } from "react-redux";
import * as _ from "lodash";
export default function UserData(props) {
  const [User, setUser] = useState({});
  const GuestList = useSelector(state => state.GuestList)
  const Auth = useSelector(state => state.Auth);
  useEffect(async () => {
    // console.log(props.Phone);
    if (props.Phone !== "" || props.Phone === undefined) {
      if (Auth.Phone === props.Phone) {
        setUser({ Name: Auth.Name, Pic: Auth.Profile });
      } else {
        let i = _.findLastIndex(GuestList, function (o) { return o.Phone == props.Phone; });
        if (i !== -1) {
          await setUser(GuestList[i])
        } else {
          await setUser({ Name: Auth.Phone, Pic: "" })
        }
      }
    }
  }, [props.Phone, GuestList]);
  return (
    <div className="w-100">
      {props.showIcon === true ? (
        User.Pic !== undefined && User.Pic !== "" ? (
          <div className="fl">
            <Avatar alt="Profile Picture" src={User.Pic} />
          </div>
        ) : (
          <div className="fl">
            <AccountCircle />
          </div>
        )
      ) : (
        <></>
      )}
      {props.showName === true ? (
        <div className="fl  fs-bold ">{User.Name} </div>
      ) : (
        <></>
      )}
    </div>
  );
}
