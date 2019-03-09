import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Task extends Component {
    render() {
        const link = "/task/" + this.props.task.id;
        return (
            <div className="card" onClick={this.props.clicked}>
                <div className="card-body">
                    <h5 className="card-title">{this.props.task.summary}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{this.props.task.status}</h6>
                    <p className="card-text">{this.props.task.description}</p>
                    <NavLink className="nav-link" to={link}>Подробнее</NavLink>
                </div>
            </div>
        )
    }
}

export default Task;