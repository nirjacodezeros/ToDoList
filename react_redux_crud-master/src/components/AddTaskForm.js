import React from 'react';
import { connect } from 'react-redux';

class AddTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { task: '' }
    }

    handleChange(event) {
        this.setState({ task: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.task.trim()) {
            alert('Task is required.');
            return;
        }
        this.props.dispatch({
            type: 'ADD_TASK',
            data: { task: this.state.task }
        });
        this.setState({ task: '' });
        this.props.createTaskHandler();
    }

    render() {
        return (
            <div>
                <h1 className="text-center"> Create Task</h1>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <div className="form-row">
                        <div className="col-2"></div>
                        <div className="col-7">
                            <input className="form-control" type="text" placeholder="Enter Task" value={this.state.task}
                                onChange={e => this.handleChange(e)} />
                        </div>
                        <div className="col-3">
                            <button type="submit" className="btn btn-success mb-2">Add Task</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect()(AddTaskForm)