import React, {Fragment, Component} from 'react'
import {NavLink} from "react-router-dom";
import axios from 'axios';
import Task from "../../components/Task/Task"


// компонент для показа списка фильмов клиенту
// фильмы запрашиваются из API в момент показа компонента на странце (mount)
const TASKS_URL = 'http://localhost:8000/api/v1/tasks';

class TaskList extends Component {
    state = {
        tasks: [],
        backlog: [],
        in_progress: [],
        done: []
    };

    getT() {
        axios.get(TASKS_URL)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(tasks => {
                console.log(tasks, 'RESPONSE');
                let stateTasks = tasks;
                console.log(tasks, 'TASKS');

                let backlog = stateTasks.filter((task) => {
                    console.log(task, 'ONE TASK');
                    return task.status === 'backlog';
                });
                console.log(backlog, 'BACKLOG');

                let in_progress = stateTasks.filter(function (task) {
                    return task.status === 'in progress';
                });
                console.log(in_progress, 'IN PROGRESS');

                let done = stateTasks.filter(function (task) {
                    return task.status === 'done';
                });
                console.log(done, 'DONE');
                this.setState({...this.state, tasks, backlog, in_progress, done})
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.getT()

    }


    render() {
        return <Fragment>
            <p><NavLink to='/tasks/add'>Добавить задачу</NavLink></p>
            <div className='row'>
                <div className='col-sm-4'>
                    <h3>Очередь</h3>
                    {this.state.backlog.map(task => {
                        return <div>
                            <Task task={task} updateBoard={this.getT.bind(this)} key={task.id}/>
                        </div>
                    })}
                </div>
                <div className='col-sm-4'>
                    <h3>В работе</h3>
                    {this.state.in_progress.map(task => {
                        return <div>
                            <Task task={task} updateBoard={this.getT.bind(this)} key={task.id}/>
                        </div>
                    })}
                </div>
                <div className='col-sm-4'>
                    <h3>Сделано</h3>
                    {this.state.done.map(task => {
                        return <div>
                            <Task task={task} updateBoard={this.getT.bind(this)} key={task.id}/>
                        </div>
                    })}
                </div>
            </div>
        </Fragment>
    }
}

export default TaskList;