/* eslint-disable import/default */
import { Component } from 'react';

// eslint-disable-next-line import/namespace, import/no-named-as-default, import/no-named-as-default-member
import Task from './Task';

export default class TaskList extends Component {
  render() {
    return (
      <ul className="todo-list">
        {this.props.tasks.map((task) => {
          return (
            <Task
              key={task.id}
              id={task.id}
              label={task.label}
              completed={task.completed}
              editing={task.editing}
              date={task.date}
              removeTask={this.props.removeTask}
              editingTask={this.props.editingTask}
              toogleCompleted={this.props.toogleCompleted}
              toogleEditing={this.props.toogleEditing}
              min={task.min}
              sec={task.sec}
            />
          );
        })}
      </ul>
    );
  }
}
