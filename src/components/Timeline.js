import React, { Component, Fragment } from 'react'

//componentes
import Day from './Day'
import ModalTasks from './modals/ModalTasks';
import LoginModal from './modals/LoginModal';

//firebase
import { firestore } from '../firebase/config'
import firebase from 'firebase/app';

const db = firestore

//week data
const weekdays = [/*"Sunday", */"Monday", "Tuesday", "Wednesday", "Thursday", "Friday",/* "Saturday"*/];
const todayDate = new Date().getDay() //returns a number
const today = weekdays[todayDate]

class Timeline extends Component {

    constructor(){
        super();
        this.state = {
            userId: '',
            userName: '',
            loading: true,
            today,
            weekdays,
            tasksModal: false,
            loginModal: false,
            selectedDay: '',
            tasksDays: [],
            logged: false
        }
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged( user => { 
            if (user) { 
                console.log('sesion iniciada')
                this.getUser(user.uid, user.displayName)
            } else { 
                console.log('sin sesion')
            } 
        }); 
    }

    getUser = (id, name)=> { //get user enrealidad
        this.setState({
            userId: id,
            userName: name,
            logged: true,
            loginModal: false,
        })

        db.collection('users')
            .where('id', '==', id)
            .get()
            .then( snapshot => {
                if (snapshot.docs.length === 0) {
                    const user = { id, name }
                    console.log(user)
                    db.collection('users')
                        .add(user)
                        .then(() => {
                            console.log('usuario agregado')
                            return this.getUser(user.id, user.name)
                        })
                        .catch(err => console.error(err))
                } else {
                    getUserTasks(snapshot, id)
                }
            })
            .catch(err => console.log(err))
        
        const getUserTasks = snapshot => {
            snapshot.forEach( doc => {
                db.collection(`users/${doc.id}/tasks`)
                    .get()
                    .then( snapshot => {
                        let data = []
                        snapshot.forEach(doc => {
                            data.push( doc.data() )
                        })
                        setState(data)
                    })
                    .catch(err => console.log('error: ' + err))
            })
        }

        const setState = (data) => {
            this.setState( prevState => ({
                // eslint-disable-next-line
                tasksDays: [...prevState.tasksDays], tasksDays: data, //escribirlo mejor y evitar el warning
                loading: false,
            }))
        }
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

    getData = docId => {
        firestore.collection(`users/${docId}/tasks`)
            .get()
            .then(snapshot => {
                let data = []
                snapshot.forEach(doc => {
                    data.push( doc.data() )
                })
                setState(data)
            })
            .catch(err => console.error(err))
        
        const setState = (data) => {
            this.setState( prevState => ({
                // eslint-disable-next-line
                tasksDays: [...prevState.tasksDays], tasksDays: data, //escribirlo mejor y evitar el warning
                loading: false,
            }))
        }
    }

    showLoginModal = () => {
        this.setState({
            loginModal: !this.state.loginModal
        })
    }

    showTasksModal = (day, close) => {
        if (close) {
            this.setState({
                tasksModal: false,
                selectedDay: day
            })
        } else {
            this.setState({
                tasksModal: true,
                selectedDay: day
            })
        }
        document.querySelectorAll('.day-box')
                .forEach( item => {
                    item.classList.remove('active-day')
                })

        const el = document.querySelector(`#${day}`) // check condicional
        if (el.classList.contains('active-day') || close) {
            el.classList.remove('active-day')
        } else{
            el.classList.add('active-day')
        }
    }

    render() {
        const { 
            today,
            tasksModal,
            loginModal,
            selectedDay,
            tasksDays,
            weekdays,
            logged,
            loading
        } = this.state

        let undoneTasks;

        if (tasksDays.length !== 0) {
            undoneTasks = tasksDays.filter(task => !task.done)
            //console.log('estas son tus tareas sin terminar', undoneTasks)
        }

        const user = this.state.userName.split(' ').splice(0, 1)

        return (
            
            // tratar de no pasar tantos props
            // ó no ejecutar funciones dentro de los componentes
            <Fragment>

                { 
                    logged && tasksDays.length > 0 ?
                        <h3 style={{'marginBottom': '40px', 'textAlign': 'center'}}>{user}, estas son tus tareas de la semana</h3> :
                    logged && tasksDays.length === 0 &&
                        <h3 style={{'marginBottom': '40px', 'textAlign': 'center'}}>{user}, añade tareas a tu semana</h3>
                }

                { !logged ? <button type="button" onClick={this.showLoginModal}>Login</button> :
                            <button type="button" onClick={this.logout}
                            style={{'position': 'absolute', 'top': '100px'}}>Log out</button> }
                    
                { loading ?
                    <div className="loading animated fadeIn">
                        <i className="fas fa-spinner fa-spin"></i>
                    </div> :
                    <div className="timeline animated slideInUp">
                        { weekdays.map((day, i) => (
                        <Day key={i}
                             today={today === day}
                             day={day}
                             tasks={tasksDays}
                             onHandleModal={this.showTasksModal}/>
                        ))} 
                    </div>
                }

                <ModalTasks isOpen={tasksModal}
                            userId={this.state.userId}
                            selectedDay={selectedDay}
                            tasks={tasksDays}
                            getData={this.getData}
                            showTasksModal={this.showTasksModal}/>

                <LoginModal isOpen={loginModal}
                            getUser={this.getUser}/>
            
            </Fragment>
        )
    }
}

export default Timeline
