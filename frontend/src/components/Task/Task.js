import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

class Task extends Component {


    updateStatus(id, status, index) {
        const TASKS_URL = 'http://localhost:8000/api/v1/tasks/';
        let new_status;
        if (status === "backlog") {
            new_status = "in progress"
        }
        else if (status === "in progress" && index === 1) {
            new_status = "done"
        }
        else if (status === "in progress" && index === -1) {
            new_status = "backlog"
        }
         else if (status === "done") {
            new_status = "in progress"
        }
        axios
            .patch(TASKS_URL + id + "/", {
                'status': new_status
            })
            .then(response => {
                console.log(response.data);
                this.props.updateBoard();
                return response.data;
            })

            .catch(error => console.log(error));
    }

    deleteTask(id) {

        const TASKS_URL = 'http://localhost:8000/api/v1/tasks/';
        axios.delete(TASKS_URL + id, {}).then(response => {
            console.log(response.data);
            this.props.updateBoard();
            return response.data;
        }).catch(error => console.log(error));


    }

    render() {
        const link = "/task/" + this.props.task.id;
        const link_edit = '/tasks/edit/' + this.props.task.id;
        return (
            <div className="card mb-1">
                <div className="card-body">
                    <h5 className="card-title">{this.props.task.summary}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{this.props.task.status_display}</h6>
                    <p className="card-text">{this.props.task.description}</p>
                    <NavLink className="nav-link" to={link}>Подробнее</NavLink>
                    <NavLink className="nav-link" to={link_edit}>Редактировать</NavLink>
                    {this.props.task.status === "backlog" && <i className="fas fa-arrow-right m-1"
                                                                onClick={() => (this.updateStatus(this.props.task.id, this.props.task.status, 1))}/>}
                    {this.props.task.status === "in progress" &&
                    <div>
                        <i className="fas fa-arrow-left m-1"
                           onClick={() => (this.updateStatus(this.props.task.id, this.props.task.status, -1))}/>
                        <i className="fas fa-arrow-right m-1"
                           onClick={() => (this.updateStatus(this.props.task.id, this.props.task.status, 1))}/>
                    </div>}
                    {this.props.task.status === "done" && <i className="fas fa-arrow-left"
                                                             onClick={() => (this.updateStatus(this.props.task.id, this.props.task.status, -1))}/>}
                       <i className="fas fa-trash-alt m-1" onClick={() => (this.deleteTask(this.props.task.id))}></i>
                </div>
            </div>
        )
    }
}

export default Task;