import React, { Component } from 'react'

//components
import Timeline from './Timeline';
import Clock from './Clock';
import LoginModal from './modals/LoginModal';

//firebase
import { firestore } from '../firebase/config';
import firebase from 'firebase/app';
const db = firestore

export default class WeekPlanner extends Component {


    state = {
        userId: '',
        userName: '',
        loginModal: false,
        loading: true,
        logged: false,
        tasksDays: [],
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged( user => { 
            if (user) this.getUser(user.uid, user.displayName)

            //check for changes
            /*db.collection('users')
                .where('id', '==', user.uid).get()
                .then( snapshot => {
                    db.collection(`users/${snapshot.docs[0].id}/tasks`)
                        .onSnapshot( snapshot => {
                            let cambios = snapshot.docChanges()
                            cambios.forEach(cambio => {
                                if(cambio.type === 'added'){
                                    console.log('añadido')
                                }
                            
                                if(cambio.type === 'deleted'){
                                    console.log('borrado')
                                }

                                if(cambio.type === 'updated'){
                                    console.log('actualzado')
                                }
                            })
                        })
                }).catch(err=>console.log(err))*/
                
        });
    }

    getUser = (id, name) => {
        this.setState({
            userId: id,
            userName: name,
            logged: true,
            loginModal: false,
        })

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
                }
                this.getData(snapshot.docs[0].id)
            })
            .catch( err => console.log(err)) 
    }

    getData = id => {
        console.log(id)
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
                }))
            })
            .catch(err => console.error(err))
    }

    logout = () => { //chequear si realmente cierra sesión
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

    showLoginModal = () => {
        this.setState({
            loginModal: !this.state.loginModal
        })
    }

    render() {
        console.log(this.state)
        const user = this.state.userName.split(' ').splice(0,1)

        return (
        <div>
            { 
                this.state.logged ?
                    (<div>
                    <h3 style={{'marginBottom': '40px', 'textAlign': 'center'}}>
                        Hello { user }<br/>hope you have a great week
                    </h3>
                    <button type="button"
                            onClick={this.logout}
                            style={{'position': 'absolute', 'top': '100px'}}>Log out</button>
                    </div>)
                    : 
                    (<button type="button" onClick={this.showLoginModal}>Login</button>)
                    
            }

            <Clock/>

            <Timeline tasksDays={this.state.tasksDays}
                      getData={this.getData}
                      userId={this.state.userId}/>
                      
            <LoginModal isOpen={this.state.loginModal} getUser={this.getUser}/>
        </div>
        )
    }
}
