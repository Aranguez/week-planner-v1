import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';

import { trueFalse } from '../redux/actions/appAction';
import { logOut } from '../redux/actions/userAction';

import { translate, Trans } from 'react-i18next';

class SlideMenu extends PureComponent<any, any> {

    render(){
        return (
            <Fragment>
                <div className={`slideMenu ${ this.props.slideMenu ? 'show' : '' }`}>
                    <h3>WeeklyPlanner</h3>
                    <i className="far fa-times-circle close"
                       onClick={() => this.props.trueFalse('slideMenu')}></i>
                    <div>
                        <button onClick={() => this.props.trueFalse('config')}>
                            <i className="fas fa-cog"></i>
                            <Trans i18nKey="slideMenu.configuration">configuration</Trans>
                        </button>
                        <button>
                            <i className="fas fa-check"></i>
                            <Trans i18nKey="slideMenu.doneTasks">Done tasks</Trans>
                        </button>
                      { this.props.user.logged ?
                        <button onClick={ this.props.logOut }>
                            <i className="fas fa-sign-out-alt"></i>
                            <Trans i18nKey="slideMenu.logOut">Logout</Trans>
                        </button>
                          :
                        <button type="button" 
                                onClick={ () => this.props.trueFalse('loginModal')}>
                                      <i className="fas fa-sign-in-alt"></i>
                                      <Trans i18nKey="slideMenu.login">Login</Trans>
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

const mapStateToProps = (state) => ({
  user: state.user,
  slideMenu: state.app.slideMenu
})

export default compose(
    connect(mapStateToProps, { trueFalse, logOut }),
    translate('common')
)(SlideMenu)
