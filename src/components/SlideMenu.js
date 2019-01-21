import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux';
import { trueFalse } from '../redux/actions/appAction';
import { logOut } from '../redux/actions/userAction';

class SlideMenu extends PureComponent {

    render(){
        //console.log('SlideMenu renders');
        return (
            <Fragment>
                <div className={`slideMenu animated ${ this.props.slideMenu ? "slideInLeft" : "hide" }`}>
                    <h3>WeeklyPlanner</h3>
                    <i className="far fa-times-circle"
                       onClick={() => this.props.trueFalse('slideMenu')}></i>
                    <div>
                      <button><i className="fas fa-cog"></i>Configuration</button>
                      <button><i className="fas fa-check"></i>Done Tasks</button>
                      { this.props.user.logged ?
                          <button onClick={ this.props.logOut }>
                                  <i className="fas fa-sign-out-alt"></i>Logout
                          </button>
                          :
                          <button type="button" 
                                  onClick={ () => this.props.trueFalse('loginModal')}>
                                      <i className="fas fa-sign-in-alt"></i>Login
                          </button>
                      }
                    </div>
                </div>
                <div className={`blackout animated ${ this.props.slideMenu ? 'show' : 'hide' }`}
                     onClick={ () => this.props.trueFalse('slideMenu') }></div>
            </Fragment>
          )

    }
}

const mapStateToProps = state => ({
  user: state.user,
  slideMenu: state.app.slideMenu
})

export default connect(mapStateToProps, { trueFalse, logOut })(SlideMenu)
