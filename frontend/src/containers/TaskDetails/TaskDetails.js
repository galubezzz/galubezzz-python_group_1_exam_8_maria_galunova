import React, {Component} from 'react';
import axios from 'axios';

class TaskDetails extends Component {

    state = {
        task: null
    };

    componentDidMount() {
        // match - атрибут, передаваемый роутером, содержащий путь к этому компоненту
        const match = this.props.match;
        const TASKS_URL = 'http://localhost:8000/api/v1/tasks/';

        // match.params - переменные из пути (:id)
        // match.params.id - значение переменной, обозначенной :id в свойстве path Route-а.
        axios.get(TASKS_URL + match.params.id)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(task => this.setState({task}))
            .catch(error => console.log(error));
    }

    render() {
        if (!this.state.task) return null;
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{this.state.task.summary}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{this.state.task.status}</h6>
                    <p className="card-text">{this.state.task.description}</p>
                    <span>{this.state.task.due_date}</span>
                    <span>{this.state.task.time_planned}</span>

                </div>
            </div>
        )
    }
}

export default TaskDetails;