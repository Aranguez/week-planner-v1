import React, { Component } from 'react'

export default class Nav extends Component {

    constructor(){
        super();
        this.state = {
            menu: false,
        }
    }

    render() {
        return (
        <div className="nav"> {/* flex */}
            <i className="fas fa-bars"></i>
            <span className="logo">WeeklyPlanner<small className="color-red badge">Alpha</small></span>
            <i className="fas fa-bell"></i>
        </div>
        )
    }
}