import React, { Component } from 'react'

//import { getUser } from '../redux/data/actions' 

//components
import Timeline from './Timeline';
import Clock from './Clock';
import LoginModal from './modals/LoginModal';
import Greeting from './Greeting';

//firebase
import { firestore } from '../firebase/config';
import firebase from 'firebase/app';
import Nav from './Nav';
import SlideMenu from './SlideMenu';
import TotalTasks from './TotalTasks';
const db = firestore



export default class WeekPlanner extends Component {

    constructor(props){
        super(props)
        this.state = {
            userId: '',
            userName: '',
            loginModal: false,
            slideMenu: false,
            loading: true,
            logged: false,
            tasksDays: [],
        }
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

    realtimeUpdate = id => {
        db.collection(`users/${this.state.userId}/tasks`).where('id', '==', id ).onSnapshot( snapshot => {

            snapshot.docChanges().forEach( change => {
                switch (change.type) {
                    case 'added':

                        let id = change.doc.data().id;
                        let updatedTask = this.state.tasksDays.find( element => {
                            return element.id === id;
                        })

                        if(!updatedTask){ //update() return 'added'
                            this.setState( prevState => ({
                                tasksDays: [...prevState.tasksDays, change.doc.data()]
                            }))
                            console.log('agregado', change.doc.data())
                        } 
                        
                    break;
                    
                    case 'modified':
                        
                        //low performance
                        let newList = this.state.tasksDays.map(task => {
                            return task.id === change.doc.data().id ?
                                   change.doc.data() :
                                   task
                        })

                        this.setState({
                            tasksDays: newList
                        })

                        console.log('modificado', change.doc.data())
                    break;
            
                    case 'removed':
                        this.setState( prevState => ({
                            tasksDays: prevState.tasksDays.filter(task => task.id !== change.doc.data().id)
                        }))
                        console.log('eliminado', change.doc.data())
                    break;
                
                    default:
                        return
                }
            });
        })  
    }

    logout = () => {
        firebase.auth().signOut().then( () => {
            this.setState({
                loading: true, //no deberia cargar todo el tiempo
                                // loading es solo para las promises
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
        
        const user = this.state.userName.split(' ').splice(0,1)

        return (
            <div>
                <SlideMenu  isOpen={this.state.slideMenu}
                            showMenu={this.showSlideMenu}
                            logOut={this.logout}
                            logged={this.state.logged}
                            handleShow={this.handleShow}/>

                <div className="container">
                    <Nav handleShow={this.handleShow}/>
                    
                    { 
                        this.state.logged ? <Greeting user={user} /> : 
                        (<button type="button"
                                 onClick={() => this.handleShow('loginModal', true)}>Login</button>) 
                    }

                    { !this.state.loading &&
                        <div className="row animated slideInUp">
                            <TotalTasks tasksDays={this.state.tasksDays}/>
                            <Clock/>
                        </div>
                    }
                    
                </div>
                
                <Timeline tasksDays={this.state.tasksDays}
                          getData={this.getData}
                          userId={this.state.userId}
                          loading={this.state.loading}
                          realtimeUpdate={this.realtimeUpdate}/>
                        
                <LoginModal isOpen={this.state.loginModal} getUser={this.getData}/>
            </div>
        )
    }
}
