import React, {Component} from 'react';
import DatePicker from "react-datepicker";
import Select from 'react-select';

import axios from 'axios';

class TaskDetails extends Component {

    state = {
        task: [],
         // сообщение об ошибке
        alert: null,

        // индикатор отключения кнопки submit, если запрос выполняется
        submitDisabled: false
    };

    // функция, обновляющая поля в this.state.task
    updateTaskState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let task = {...prevState.task};
            task[fieldName] = value;
            newState.task = task;
            return newState;
        });
    };
    selectChanged = (field, value) => {
        const status = value.value;
        this.updateTaskState(field, status);
        console.log("FFF"+ status + field);
    };
    // обработчик ввода в поля ввода
    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updateTaskState(fieldName, value);
    };

    // обработчик изменения дат
    dateChanged = (field, date) => {
        this.updateTaskState(field, date.toISOString());
    };


    // обработчик отправки формы
    formSubmitted = (event) => {
        event.preventDefault();

        // блокировка отправки формы на время выполнения запроса
        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitDisabled = true;
            return newState;
        });
        const TASKS_URL = 'http://localhost:8000/api/v1/tasks/';
        // отправка запроса
        axios.put(TASKS_URL + this.state.task.id + '/', this.state.task)
            // если всё успешно, переходим на просмотр страницы фильма с id,
            // указанным в ответе
            .then(task => this.props.history.replace('/'))
            .catch(error => {
                console.log(error);
                this.setState(prevState => {
                    let newState = {...prevState};
                    newState.alert = {type: 'danger', message: `Task was not changed!2`};
                    newState.submitDisabled = false;
                    return newState;
                });
            });
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
            .then(task => this.setState({task: task}))
            .catch(error => console.log(error));
    }

    render() {
        // распаковка данных фильма, чтобы было удобнее к ним обращаться
        const {summary, description, due_date, status, time_planned} = this.state.task;

        // создание разметки для алерта, если он есть
        let alert = null;
        if (this.state.alert) {
            alert = <div className={"alert alert-" + this.state.alert.type}>{this.state.alert.message}</div>
        }

        // форматирование дат для DatePicker'ов
        const due_date_selected = due_date ? new Date(due_date) : null;
        const status_options = [{value: "backlog", label: "Очередь"}, {value: "in progress", label: "В процессе"}, {value: "done", label: "Сделано"}];

        return <div>
            {alert}
            <form onSubmit={this.formSubmitted}>
                <div className="form-group">
                    <label className="font-weight-bold">Саммари</label>
                    <input type="text" className="form-control" name="summary" value={summary} onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label>Описание</label>
                    <input type="text" className="form-control" name="description" value={description}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label className="font-weight-bold">Дата дедлайна</label>
                    <div>
                        <DatePicker dateFormat="yyyy-MM-dd HH:MM:ss" showTimeSelect timeFormat="HH:mm" selected={due_date_selected} className="form-control"
                                    name="release_date" onChange={(date) => this.dateChanged('due_date', date)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Запланированное время</label>
                    <input type="number" className="form-control" name="time_planned" value={time_planned}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label>Статус</label>
                    <Select options={status_options} name='status' value={{value: this.state.task.status, label: this.state.task.status_display}}
                            onChange={(value) => this.selectChanged("status", value)}/>
                </div>
                <button disabled={this.state.submitDisabled} type="submit"
                        className="btn btn-primary">Сохранить</button>
            </form>
        </div>;
    };
}

export default TaskDetails;