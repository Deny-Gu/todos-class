import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';
import Footer from './Footer';

export default class Todo extends Component {
  state = {
    tasks: [],
    id: 0,
    filter: 'All',
    countItem: 0,
  };

  addTask = (label, min, sec) => {
    this.setState({
      tasks: [
        ...this.state.tasks,
        {
          id: this.state.id + 1,
          label: label,
          completed: false,
          editing: false,
          date: 'created ' + formatDistanceToNow(new Date(), { addSuffix: true }),
          min: !min ? 0 : min,
          sec: !sec ? 0 : sec,
        },
      ],
    });
    this.setState((state) => {
      return {
        id: state.id + 1,
        countItem: state.countItem + 1,
      };
    });
  };

  removeTask = (id) => {
    let remove = this.state.tasks.filter((task) => task.id !== id);
    this.setState({
      tasks: remove,
    });
    this.setState((state) => {
      return {
        countItem: state.countItem - 1,
      };
    });
  };

  editingTask = (id, newLabel) => {
    if (!newLabel) {
      return;
    }
    let editing = this.state.tasks.map((task) =>
      task.id === id ? { ...task, label: newLabel, editing: false } : task
    );
    this.setState({
      tasks: editing,
    });
  };

  toogleCompleted = (id) => {
    let completed = this.state.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.setState({
      tasks: completed,
    });
  };

  toogleEditing = (id) => {
    let editing = this.state.tasks.map((task) =>
      task.id === id ? { ...task, editing: !task.editing } : task
    );
    this.setState({
      tasks: editing,
    });
  };

  removeCompletedTasks = () => {
    let completedTasks = this.state.tasks.filter((task) => !task.completed);
    this.setState({
      tasks: completedTasks,
    });
  };

  toggleFilter = (target) => {
    let tasks = document.querySelectorAll('.todo-list li');
    let count = 0;
    if (target === 'Completed') {
      this.setState({
        filter: target,
      });
      tasks.forEach((li) => {
        if (li.className !== ' completed') {
          li.style.display = 'none';
        } else {
          li.style.display = 'list-item';
          count++;
        }
      });
    }
    if (target === 'Active') {
      this.setState({
        filter: target,
      });
      tasks.forEach((li) => {
        if (li.className === ' completed') {
          li.style.display = 'none';
        } else {
          li.style.display = 'list-item';
          count++;
        }
      });
    }
    if (target === 'All') {
      this.setState({
        filter: target,
      });
      tasks.forEach((li) => {
        li.style.display = 'list-item';
        count++;
      });
    }
    this.setState({
      countItem: count,
    });
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={this.state.tasks}
            filter={this.state.filter}
            removeTask={this.removeTask}
            editingTask={this.editingTask}
            toogleCompleted={this.toogleCompleted}
            toogleEditing={this.toogleEditing}
            filterTasks={this.state.filterTasks}
          />
          <Footer
            count={this.state.countItem}
            removeCompletedTasks={this.removeCompletedTasks}
            filter={this.state.filter}
            toggleFilter={this.toggleFilter}
          />
        </section>
      </section>
    );
  }
}
