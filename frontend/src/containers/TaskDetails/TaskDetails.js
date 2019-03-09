import React, {Component} from 'react';

class TaskDetails extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{this.props.task.summary}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{this.props.task.status.value()}</h6>
                    <p className="card-text">{this.props.task.description}</p>
                    <span>{this.props.task.due_date}</span>
                    <span>{this.props.task.time_planned}</span>
                </div>
            </div>
        )
    }
}

export default TaskDetails;