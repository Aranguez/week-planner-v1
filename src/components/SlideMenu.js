import React, { Fragment, PureComponent } from 'react'

class SlideMenu extends PureComponent {

    render(){
        //console.log('SlideMenu renders');
        return (
            <Fragment>
                <div className={`slideMenu animated ${ this.props.isOpen ? "slideInLeft" : "hide slideOutLeft" }`}>
                    <h3>WeeklyPlanner</h3>
                    <div>
                      <button><i className="fas fa-cog"></i>Configuration</button>
                      <button><i className="fas fa-check"></i>Done Tasks</button>
                      { this.props.logged ?
                          <button onClick={ this.props.logOut }>
                                  <i className="fas fa-sign-out-alt"></i>Logout
                          </button>
                          :
                          <button type="button" 
                                  onClick={ () => this.props.handleShow('loginModal', true)}>
                                      <i className="fas fa-sign-in-alt"></i>Login
                          </button>
                      }
                    </div>
                </div>
                <div className={`blackout animated ${ this.props.isOpen ? 'show' : 'hide' }`}
                     onClick={ () => this.props.handleShow('slideMenu', false) }></div>
            </Fragment>
          )

    }
}

export default SlideMenu
