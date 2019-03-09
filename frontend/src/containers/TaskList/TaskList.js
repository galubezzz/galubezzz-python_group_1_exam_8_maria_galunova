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

    componentDidMount() {
        axios.get(TASKS_URL)
            .then(response => {console.log(response.data); return response.data;})
            .then(tasks => this.setState({tasks: tasks}))
            .catch(error => console.log(error));

        let tasks = [...this.state.tasks];
        console.log(tasks);

        let backlog = tasks.filter(function(task) {
            return task.status === 'backlog';
        });

        this.setState({backlog: backlog})
        console.log(backlog);

        let in_progress = tasks.filter(function(task) {
            return task.status === 'in_progress';
        });
        this.setState({in_progress: in_progress})

        let done = tasks.filter(function(task) {
            return task.status === 'done';
        });
        this.setState({done: done})

    }


    render() {
        return <Fragment>
            <p><NavLink to='/tasks/add'>Добавить задачу</NavLink></p>
            <div className='row'>
                {this.state.tasks.map(task => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3'>
                        <Task task={task}/>
                    </div>
                })}
            </div>
        </Fragment>
    }
}

export default TaskList;