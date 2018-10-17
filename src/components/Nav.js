import React from 'react'

 const Nav = props => (
        <div className="nav">
            <i className="fas fa-bars" onClick={props.showMenu}></i>
            <span className="logo">WeeklyPlanner<small className="color-red badge">Alpha</small></span>
            <i className="fas fa-bell"></i>
        </div>
)


export default Nav
