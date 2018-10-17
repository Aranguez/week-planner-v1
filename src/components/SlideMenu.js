import React, { Fragment } from 'react'

const SlideMenu = props => (
      <Fragment>
          <div className={`slideMenu animated ${ props.isOpen ? "slideInLeft" : "hide slideOutLeft" }`}>
              <h3>WeeklyPlanner</h3>
              {/*<i className="far fa-times-circle"
                 onClick={ props.showMenu }></i>*/}
              <div>
                <button><i className="fas fa-cog"></i>Configuration</button>
                <button><i className="fas fa-check"></i>Done Tasks</button>
                <button onClick={ props.logOut }><i className="fas fa-sign-out-alt"></i>Logout</button>
              </div>
          </div>
          <div className={`blackout animated ${ props.isOpen ? 'show' : 'hide' }`}
               onClick={ props.showMenu }></div>
      </Fragment>
    )

export default SlideMenu
