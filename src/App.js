import "./App.css";
import "./Colors.css";
import "./Responsive.css";
import "./Scrollbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/swiper-bundle.min.css";
import "react-modal-video/css/modal-video.min.css";
import React, { useState, useEffect } from "react";
import ReactGa from "react-ga";
import { Router, Switch, Route } from "react-router-dom";
import Redirector from "./Utils/Routing";
import history from "./Utils/History";
import { useSelector, useDispatch } from "react-redux";
import Home from "./Components/Home/Home";
import AddEvent from "./Components/AddEvent/AddEvent";
import Rsvp from "./Components/Invitations/RSVP/Rsvp";
import AddEventSucess from "./Components/AddEvent/AddEventSucess";
import Chat from "./Components/Chat/Chat";
import Feed from "./Components/Feed/Feed";
import Comment from "./Components/Comments/Coments";
import ShowSchedule from "./Components/Invitations/ShowSchedule";
import InvitaionviewToggler from "./Components/Invitations/InvitaionviewToggler";
import Locationofline from "./Components/Location Offline/LocationOffline";
import Jitsi from "./Components/jitsi/Jitsivc";
import GuestList from "./Components/Guest/Guest";
import Hoxinvitation from "./Components/Invitations/hoxinvitation";
import SidebarMore from "./Components/Sidebar/SidebarMore";
import AdminSidebar from "./Components/Sidebar/AdminSidebar";
import EventAdmin from "./Components/Admin/EventAdmin";
import ManageGuest from "./Components/Guest/ManageGuest";
import EditEvent from "./Components/EditEvent/EditEvent";
import HomePage from "./Components/HomePage/HomePage";
import ShowStory from "./Components/Invitations/ShowStory";
import ShowAlbum from "./Components/Invitations/ShowAlbum";
import Gift from "./Components/Gift/Gift";
import AdminUI from "./Components/Admin/AdminUI"
import {
  GetEvents,
  GetInvitations,
} from "./Redux/DispatchFuncitons/Eventfunctions";
import { gettemplate } from "./Redux/DispatchFuncitons/TemplateFunctions";
import { getVideotemplate } from "./Redux/DispatchFuncitons/VideoTemplate";

import CreateOrUpdate from "./Components/EventCreateAndUpdate/CreateOrUpdate";
import { getlist } from "./Redux/DispatchFuncitons/GuestListFunctions";
import Templates from "./Components/Templates/Templates";
import Terms from "./Components/HomePage/Terms";
import Hoxdetails from "./Components/Invitations/hoxdetails";
import AddGift from "./Components/Gift/AddGift"
function App() {
  const dispatch = useDispatch();
  const [loop, setloop] = useState();

  const Auth = useSelector((state) => state.Auth);
  useEffect(() => {
    ReactGa.initialize("UA-201872924-1");
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);
  let interval;
  useEffect(async () => {
    dispatch(gettemplate());
    dispatch(getVideotemplate());
    if (Auth.isLoggedIn === true) {

      interval = setInterval(() => {
        dispatch(GetEvents());
        dispatch(GetInvitations());
        dispatch(getlist());
      }, 10000);
      await setloop(interval);
    } else {
      await clearInterval(loop);
      await setloop();
    }
  }, [Auth.isLoggedIn]);

  if (Auth.isLoggedIn === false) {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              exact
              path="/MyInvitations/:maincode"
              component={Hoxinvitation}
            />
            <Route
              exact
              path="/MyInvitations/:maincode/:Code"
              component={Hoxinvitation}
            />
            <Route
              exact
              path="/MyInvitationsdetail/:maincode/:field"
              component={Hoxdetails}
            />
            <Route
              exact
              path="/MyInvitations/:maincode/:Code"
              component={Hoxinvitation}
            />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/templates" component={Templates} />
            <Route exact path="/terms" component={Terms} />
            <Route exact
              path="/admin" component={AdminUI} />
            <Route exact path="/*" component={Redirector} />

          </Switch>
        </div>
      </Router>
    );
  } else {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>

            <Route
              exact
              path="/MyInvitations/:maincode"
              component={Hoxinvitation}
            />
            <Route
              exact
              path="/MyInvitations/:maincode/:Code"
              component={Hoxinvitation}
            />
            <Route exact path="/MyEvents/eventpage/chat/:id" component={Chat} />
            <Route
              exact
              path="/MyEvents/GuestList/:id/:invno"
              component={GuestList}
            />
            <Route
              exact
              path="/MyEvents/Manage-GuestList/:id/:invno"
              component={ManageGuest}
            />
            <Route
              exact
              path="/MyEvents/Manage-Event/:id/:invno"
              component={EditEvent}
            />
            <Route
              exact
              path="/MyEvents/Admin/:id/:eid"
              component={EventAdmin}
            />

            <Route exact path="/MyEvents/admin/:id" component={AdminSidebar} />
            <Route exact path="/MyEvents/More/:id" component={SidebarMore} />
            <Route
              exact
              path="/MyEvents/admin/edit/:id/:eid"
              component={<div>edit</div>}
            />
            <Route
              exact
              path="/MyEvents/Location/:id/:event"
              component={Locationofline}
            />
            <Route
              exact
              path="/MyEvents/schedule/:id/:event"
              component={ShowSchedule}
            />
            <Route exact path="/MyEvents/rsvp/:id" component={Rsvp} />
            <Route
              exact
              path="/MyEvents/eventpage/:id"
              component={InvitaionviewToggler}
            />

            <Route
              exact
              path="/MyEvents/eventpage/gift/:id/:MainCode"
              component={AddGift}
            />
            <Route
              exact
              path="/MyEvents/eventpage/feed/:id/:MainCode"
              component={Feed}
            />
            <Route
              exact
              path="/MyEvents/comments/:id/:_id"
              component={Comment}
            />
            <Route exact path="/MyEvents/albums/:id" component={ShowAlbum} />
            <Route exact path="/MyEvents/story/:id" component={ShowStory} />
            <Route exact path="/inv/albums/:id" component={ShowAlbum} />
            <Route exact path="/inv/story/:id" component={ShowStory} />
            <Route
              exact
              path="/inv/Manage-Event/:id/:invno"
              component={EditEvent}
            />
            <Route exact path="/inv/Admin/:id/:eid" component={EventAdmin} />
            {/* <Route
              exact
              path="/inv/Admin/:id/"
              component={AdminSidebar}
            /> */}
            <Route exact path="/inv/More/:id" component={SidebarMore} />
            <Route exact path="/inv/comments/:id/:_id" component={Comment} />
            <Route
              exact
              path="/inv/eventpage/gift/:id/:MainCode"
              component={AddGift}
            />
            <Route
              exact
              path="/inv/eventpage/feed/:id/:MainCode"
              component={Feed}
            />
            <Route exact path="/inv/videoconf/:id/" component={Jitsi} />
            <Route exact path="/inv/eventpage/chat/:id" component={Chat} />
            <Route
              exact
              path="/inv/Location/:id/:event"
              component={Locationofline}
            />
            <Route
              exact
              path="/inv/schedule/:id/:event"
              component={ShowSchedule}
            />
            <Route
              exact
              path="/inv/GuestList/:id/:invno"
              component={GuestList}
            />

            {/* <Route exact path="/inv/info/:id" component={Invitationlist} /> */}
            <Route exact path="/inv/rsvp/:id" component={Rsvp} />
            <Route
              exact
              path="/inv/eventpage/:id"
              component={InvitaionviewToggler}
            />
            <Route exact path="/MyEvents" component={Home} />
            <Route exact path="/MyInvitations" component={Home} />
            <Route
              exact
              path="/MyEvents/event-create-success/:id"
              component={AddEventSucess}
            />
            <Route
              exact
              path="/MyEvents/event-create-success/:id/:Share"
              component={AddEventSucess}
            />
            <Route exact path="/MyEvents/edit/:id" component={CreateOrUpdate} />
            <Route exact path="/add-event" component={AddEvent} />
            <Route exact path="/user-profile" component={AddEvent} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={Home} />
            <Route exact path="/*" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
