import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { showNotification } from '../redux/actions/appAction';

const Notification = ({ notification, showNotification }) => {
  console.log(notification)
  return (
    <Fragment>
      <div className={`panel notification ${ notification.show ? "show animated fadeIn" : "hide"}`}>
        { notification.items.length > 0 ?
          notification.items.map((item, i) => <p key={i}>{item}</p>) :
          <p>No notifications</p>
        }
      </div>
      <div className={`blackout ${ notification.show ? 'show' : 'hide' }`}
            onClick={ showNotification }></div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  notification: state.app.notification
})

export default connect(mapStateToProps, { showNotification })(Notification)
