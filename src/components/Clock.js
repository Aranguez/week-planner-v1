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
        let hours = Math.abs(time.getHours() - 23);
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

        this.setState({
            hours,
            mins,
            secs
        })
    }
    
    render(){
        //console.log('Clock renders');

        return (
            <div className="panel">
                <div>
                    <h1>
                        <span> {this.state.hours}</span>
                        <span>:{this.state.mins}</span>
                        <span>:{this.state.secs}</span>
                    </h1>
                    <span>to finish this day</span>
                </div>
            </div>
        );
    }
};