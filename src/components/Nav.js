import React, { PureComponent } from 'react'

 class Nav extends PureComponent {

    render(){
        return (
            <div className="nav">
                <i className="fas fa-bars" onClick={() => this.props.handleShow('slideMenu', true)}></i>
                <span className="logo">WeeklyPlanner<small className="color-red badge">Alpha</small></span>
                <i className="fas fa-bell"></i>
            </div>
        )
    }   
}

export default Nav
