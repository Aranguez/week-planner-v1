import React, { useEffect } from 'react';

import { connect } from "react-redux";
import { getUser } from "../../redux/actions/userAction";
import { getTasks } from "../../redux/actions/taskAction";
import { trueFalse } from "../../redux/actions/appAction";

//components
import Timeline from "../Timeline/Timeline";
import Clock from "../Clock/Clock";
import LoginModal from "../../components/modals/LoginModal";
import Greeting from "../Greeting/Greeting";
import Config from "../Config/Config";

//firebase
import firebase from 'firebase/app';
import Nav from "../Nav/Nav";
import SlideMenu from "../SlideMenu/SlideMenu";
import TotalTasks from "../TotalTasks/TotalTasks";

const WeekPlanner: React.FC<any> = props => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        props.getUser(user.uid, user.displayName);
        props.getTasks(user.uid);
      } else {
        props.trueFalse("loginModal");
      }
    });
  }, []);

  return (
    <>
      <SlideMenu />
      <LoginModal />
      <Config />

      <div className="container">
        <Nav />
      </div>

      {props.user.logged && !props.loading && (
        <>
          <div className="container">
            <Greeting />
            <div className="row animated slideInUp">
              <TotalTasks />
              <Clock />
            </div>
          </div>
          <Timeline />
        </>
      )

      // {<div className="loading animated fadeIn">
      //     Please Login
      //     <i className="fas fa-spinner fa-spin"></i>
      // </div> }
      }
    </>
  );
};

const mapStateToProps = state => {
  return {
    app: state.app,
    loading: state.app.loading,
    tasks: state.tasks.tasksList,
    user: state.user,
    state: state
  };
};

export default connect(
  mapStateToProps,
  { getUser, getTasks, trueFalse }
)(WeekPlanner);
