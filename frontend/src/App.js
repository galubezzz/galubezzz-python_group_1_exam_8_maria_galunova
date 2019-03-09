import React, { Component } from 'react';
import TaskList from "./containers/TaskList/TaskList"
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router';

class App extends Component {
  render() {
    return (
      <div className="container">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={TaskList}/>
                    </Switch>
                </BrowserRouter>
            </div>
    );
  }
}

export default App;
