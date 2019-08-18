import React from 'react';
import { connect } from 'react-redux';
//import { showNotification } from 'redux/actions/appAction';

const Notification = ({ notification }) => {
  console.log(notification);
  return (
    <>
      <div
        className={`panel notification ${
          notification.show ? "show animated fadeIn" : "hide"
        }`}
      >
        {notification.items.length > 0 ? (
          notification.items.map((item, i) => <p key={i}>{item}</p>)
        ) : (
          <p>No notifications</p>
        )}
      </div>
      <div
        className={`blackout ${notification.show ? "show" : "hide"}`}
        //onClick={showNotification}
      />
    </>
  );
};

const mapStateToProps = state => ({
  notification: state.app.notification
});

export default connect(
  mapStateToProps,
  //{ showNotification }
)(Notification);
