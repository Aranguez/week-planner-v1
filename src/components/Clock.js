import React, { Component } from 'react';

export default class Clock extends Component {

    constructor(){
        super();
        this.state = {
            hours: '',
            mins: ''
        }
    }

    componentDidMount(){
        this.clock()
        setInterval( this.clock, 1000 );
    }

    clock = () => {
        let time = new Date();
        let hours = time.getHours();
        let mins = time.getMinutes();
    
        if (hours < 10) {
            hours = '0' + hours
        }
        if (mins < 10) {
            mins = '0' + mins
        }

        if (this.state.mins !== mins) {
            this.setState({
                hours,
                mins
            })
        }
    }
    
    render(){
        return (
            <div className="clock">
                <h1><span>{this.state.hours}</span>:<span>{this.state.mins}</span></h1>
            </div>
        );
    }
};