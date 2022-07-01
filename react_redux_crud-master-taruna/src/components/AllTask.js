import React from 'react'
import { connect } from 'react-redux';
import EditTaskForm from './EditTaskForm';
import Task from './Task';

class AllTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = { filter: 'All' }
    }

    handleChangeEvent(event) {
        this.setState({ filter: event.target.value });
    }

    render() {

        // filter the task array here
        let filterElement = this.props.tasks;
        filterElement = (this.state.filter === 'All') ? filterElement : filterElement.filter((v) => v.status === this.state.filter);

        return (
            <div>
                <h1 className="text-center">{this.state.filter} Tasks</h1><br />
                <select className="form-control select-tab" title="Select Status" onChange={(e) => this.handleChangeEvent(e)}>
                    <option value="All"> All </option>
                    <option value="Active"> Active </option>
                    <option value="Complete"> Complete </option>
                </select> <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th> Index </th>
                            <th> Task </th>
                            <th> Status </th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterElement.map((task, index) => {
                            return (task.editing ?
                                <EditTaskForm updateTaskHandler={this.props.updateTaskHandler} key={task.id} task={task} index={index + 1} /> :
                                <Task deleteTaskHandler={this.props.deleteTaskHandler} key={task.id} task={task} index={index + 1} />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state
    }
}

export default connect(mapStateToProps)(AllTask);