import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { trueFalse } from "../../redux/actions/appAction";
import { logOut } from "../../redux/actions/userAction";

import { Trans } from "react-i18next";

const SlideMenu: React.FC<any> = props => {
  console.log(props);

  return (
    <>
      <div className={`slideMenu ${props.slideMenu ? "show" : ""}`}>
        <h3>WeeklyPlanner</h3>
        <i
          className="far fa-times-circle close"
          onClick={() => props.trueFalse("slideMenu")}
        />
        <div>
          <button onClick={() => props.trueFalse("config")}>
            <i className="fas fa-cog" />
            <Trans i18nKey="slideMenu.configuration">configuration</Trans>
          </button>
          <button>
            <i className="fas fa-check" />
            <Trans i18nKey="slideMenu.doneTasks">Done tasks</Trans>
          </button>
          {props.user.logged ? (
            <button onClick={props.logOut}>
              <i className="fas fa-sign-out-alt" />
              <Trans i18nKey="slideMenu.logOut">Logout</Trans>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => props.trueFalse("loginModal")}
            >
              <i className="fas fa-sign-in-alt" />
              <Trans i18nKey="slideMenu.login">Login</Trans>
            </button>
          )}
        </div>
      </div>
      <div
        className={`blackout animated ${
          props.slideMenu ? "show" : "hide"
        }`}
        onClick={() => props.trueFalse("slideMenu")}
      />
    </>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  slideMenu: state.app.slideMenu
});

export default compose(
  connect(
    mapStateToProps,
    { trueFalse, logOut }
  ),
  //withI18n()
)(SlideMenu);
