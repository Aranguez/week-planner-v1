import React, { Component } from 'react'

//components
import Timeline from './Timeline';
import Clock from './Clock';
import LoginModal from './modals/LoginModal';

//firebase
import { firestore } from '../firebase/config';
import firebase from 'firebase/app';
import Nav from './Nav';
import SlideMenu from './SlideMenu';
const db = firestore

export default class WeekPlanner extends Component {

    state = {
        userId: '',
        userName: '',
        loginModal: false,
        slideMenu: false,
        loading: true,
        logged: false,
        tasksDays: [],
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged( user => { 
            if (user) this.getUser(user.uid, user.displayName)    
        });
    }

    getUser = (id, name) => {

        db.collection('users').where('id', '==', id).get()
            .then( snapshot => {
                if (snapshot.docs.length === 0) {
                    db.collection('users')
                        .add({ id, name })
                        .then(() => {
                            console.log('usuario agregado')
                            this.getUser(id, name)
                        })
                        .catch(err => console.error(err))
                } else {
                    this.setState({
                        userId: snapshot.docs[0].id,
                        userName: name,
                    })
                    this.getData(snapshot.docs[0].id)
                }
            })
            .catch( err => console.error('error al encontrar usuario', err))

    }

    getData = id => {
        db.collection(`users/${id}/tasks`)
        .get()
        .then( snapshot => {
            let data = []
            snapshot.forEach( doc => {
                data.push(doc.data())
            })
            this.setState( prevState => ({
                // eslint-disable-next-line
                tasksDays: [...prevState.tasksDays], tasksDays: data,
                loading: false,
                logged: true,
                loginModal: false,
            }))
        })
        .catch(err => console.error('error cargando tasks', err))
    }

    logout = () => {
        firebase.auth().signOut().then( () => {
            this.setState({
                loading: true,
                userId: '',
                selectedDay: '',
                tasksDays: [],
                logged: false,
                tasksModal: false,
            })
        })
    }

    handleShow = (thingToShow, value) => {
        this.setState({
            [thingToShow]: value
        })
    }

    render() {
        console.log(this.state)
        const user = this.state.userName.split(' ').splice(0,1)

        return (
            <div>
                <SlideMenu isOpen={this.state.slideMenu}
                        showMenu={this.showSlideMenu}
                        logOut={this.logout}
                        logged={this.state.logged}
                        handleShow={this.handleShow}/>

                <div className="container">
                    <Nav handleShow={this.handleShow}/>
                    { 
                        this.state.logged ?
                            (
                            <h3 style={{'marginBottom': '40px'}}>
                                <span className="color-red">Hello { user }</span><br/>
                                <span>hope you have a great week</span>
                            </h3>)
                            : 
                            (<button type="button" onClick={() => this.handleShow('loginModal', true)}>Login</button>)
                            
                    }

                    { !this.state.loading &&
                        <div className="row animated slideInUp">
                            <div className="panel">
                                <div>
                                    <h1>{this.state.tasksDays.length}</h1>
                                    <span>total tasks</span>
                                </div>
                            </div>
                            <Clock/>
                        </div>
                    }
                    
                </div>
                

                <Timeline tasksDays={this.state.tasksDays}
                          getData={this.getData}
                          userId={this.state.userId}
                          loading={this.state.loading}/>
                        
                <LoginModal isOpen={this.state.loginModal} getUser={this.getData}/>
            </div>
        )
    }
}
