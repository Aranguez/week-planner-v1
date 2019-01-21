import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { trueFalse } from '../redux/actions/appAction';

class Nav extends PureComponent {

    render(){
        return (
            <div className="nav">
                <i className="fas fa-bars" onClick={() => this.props.trueFalse('slideMenu')}></i>
                <span className="logo">WeeklyPlanner<small className="color-red badge">Alpha</small></span>
                <i className="fas fa-bell" onClick={() => console.log('click')}></i>
            </div>
        )
    }   
}

export default connect(null, { trueFalse })(Nav)
