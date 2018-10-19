import React, { Fragment } from 'react'

const SlideMenu = props => (
      <Fragment>
          <div className={`slideMenu animated ${ props.isOpen ? "slideInLeft" : "hide slideOutLeft" }`}>
              <h3>WeeklyPlanner</h3>
              <div>
                <button><i className="fas fa-cog"></i>Configuration</button>
                <button><i className="fas fa-check"></i>Done Tasks</button>
                { props.logged ?
                    <button onClick={ props.logOut }>
                            <i className="fas fa-sign-out-alt"></i>Logout
                    </button>
                    :
                    <button type="button" 
                            onClick={ () => props.handleShow('loginModal', true)}>
                                <i className="fas fa-sign-in-alt"></i>Login
                    </button>
                }
              </div>
          </div>
          <div className={`blackout animated ${ props.isOpen ? 'show' : 'hide' }`}
               onClick={ () => props.handleShow('slideMenu', false) }></div>
      </Fragment>
    )

export default SlideMenu
