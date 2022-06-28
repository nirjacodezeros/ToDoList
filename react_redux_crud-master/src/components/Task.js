import React from 'react';
import { connect } from 'react-redux';

class Task extends React.Component {

    handleStatusUpdate(event, task) {
        event.preventDefault();
        this.props.dispatch({
            type: 'STATUS_UPDATE',
            id: task.id,
            data: {
                status: (task.status === 'Active') ? 'Complete' : 'Active'
            }
        })
    }

    handleDelete(task) {
        if (window.confirm('Are you sure want to delete task?')) {
            this.props.dispatch({ type: 'DELETE_TASK', id: task.id });
            this.props.deleteTaskHandler();
        }
    }

    render() {
        return (
            <tr>
                <td> {this.props.index}</td>
                <td> {this.props.task.task} </td>
                <td onClick={(e) => this.handleStatusUpdate(e, this.props.task)} className="cursor-pointer">
                    <a href="true" className={this.props.task.status === 'Active' ? 'text-success' : 'text-primary'}>{this.props.task.status}</a>
                </td>
                <td>
                    <button className="btn btn-primary btn-sm custom-btn" onClick={() => this.props.dispatch({ type: 'EDIT_TASK', id: this.props.task.id })}> Edit </button> &nbsp;
                    <button className="btn btn-danger btn-sm custom-btn" onClick={() => this.handleDelete(this.props.task)}> Delete </button>
                </td>
            </tr>
        )
    }

}

export default connect()(Task);