import React, {Component} from 'react';

class Task extends Component {
    render() {
        return (
            <div>
                <p>{this.props.task.summary}</p>
                <p>{this.props.task.description}</p>
            </div>
        )
    }
}

export default Task;