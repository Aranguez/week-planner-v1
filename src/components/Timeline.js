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
const today = weekdays[todayDate-1]

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
            if (user) this.getUser(user.uid)

            //check for changes
            db.collection('users')
                .where('id', '==', user.uid).get()
                .then( snapshot => {
                    db.collection(`users/${snapshot.docs[0].id}/tasks`)
                        .onSnapshot( snapshot => {
                            let cambios = snapshot.docChanges()
                            
                            cambios.forEach(cambio => {
                                if(cambio.type === 'added'){
                                    //console.log('añadido')
                                }
                            
                                if(cambio.type === 'deleted'){
                                    //console.log('borrado')
                                }

                                if(cambio.type === 'updated'){
                                    //console.log('actualzado')
                                }
                            })
                        })
                }).catch(err=>console.log(err))
                
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

    showTasksModal = (day, close) => {
        this.setState({
            tasksModal: true,
            selectedDay: day
        })
        
        document.querySelectorAll('.box')
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

        const user = 'leandro'

        return (

            <Fragment>

                { /*
                    logged && tasksDays.length > 0 ?
                        <h3 style={{'marginBottom': '40px', 'marginLeft': '35px'}}>
                            <span className="color-red">Hello {user}</span><br/> hope you have a great week</h3> :
                    logged && tasksDays.length === 0 &&
                        <h3 style={{'marginBottom': '40px', 'marginLeft': '35px'}}>
                            <span className="color-red">Hello {user}</span><br/> add tasks for your week</h3>
                */}

                { !logged ? <button type="button" onClick={this.showLoginModal}>Login</button> :
                            <button type="button" onClick={this.logout}
                            style={{'position': 'absolute', 'top': '100px'}}>Log out</button> }
                    
                { loading && logged &&
                    <div className="loading animated fadeIn">
                        <i className="fas fa-spinner fa-spin"></i>
                    </div>    
                }
                
                { !loading && logged &&
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
