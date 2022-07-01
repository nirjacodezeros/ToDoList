import React, { Component } from 'react';
import AddTaskForm from './AddTaskForm'
import AllTask from './AllTask';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { create: false, delete: false, update: false }
    }

    createTaskHandler() {
        this.setState({ create: true });
        setTimeout(() => {
            this.setState({ create: false });
        }, 2000);
    }

    updateTaskHandler() {
        this.setState({ update: true });
        setTimeout(() => {
            this.setState({ update: false });
        }, 2000);
    }

    deleteTaskHandler() {
        this.setState({ delete: true });
        setTimeout(() => {
            this.setState({ delete: false });
        }, 2000);
    }

    render() {
        return (
            <div><br />
                <div className="container">
                    <div className="jumbotron">
                        <AddTaskForm createTaskHandler={e => this.createTaskHandler()} />
                        <hr />
                        {this.state.create ? <div className="alert alert-success" role="alert">
                            <h5 className="text-center">Task successfully created !!!</h5>
                        </div> : ''}
                        {this.state.update ? <div className="alert alert-success" role="alert">
                            <h5 className="text-center">Task successfully updated !!!</h5>
                        </div> : ''}
                        {this.state.delete ? <div className="alert alert-danger" role="alert">
                            <h5 className="text-center">Task successfully deleted !!!</h5>
                        </div> : ''}
                        <AllTask deleteTaskHandler={e => this.deleteTaskHandler()} updateTaskHandler={e => this.updateTaskHandler()} />
                    </div>
                </div>
            </div>
        );
    }
}
export default App;