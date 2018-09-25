import React, { Component } from 'react';

export default class Clock extends Component {

    constructor(){
        super();
        this.state = {
            hours: '',
            mins: '',
            secs: ''
        }
    }

    componentDidMount(){
        this.clock()
        setInterval( this.clock, 1000 );
    }

    clock = () => {
        let time = new Date();
        let hours = Math.abs(time.getHours() - 24);
        let mins = Math.abs(time.getMinutes() - 60);
        let secs = Math.abs(time.getSeconds() - 60);
    
        if (hours < 10) {
            hours = '0' + hours
        }

        if (mins < 10) {
            mins = '0' + mins
        }

        if (secs < 10) {
            secs = '0' + secs
        }

        //if (this.state.mins !== mins) {
            this.setState({
                hours,
                mins,
                secs
            })
        //}
    }
    
    render(){
        return (
            <div className="clock">
                <h1>Faltan <span>{this.state.hours}</span><span>:{this.state.mins}</span><span>:{this.state.secs}</span> para que termine el día</h1>
            </div>
        );
    }
};