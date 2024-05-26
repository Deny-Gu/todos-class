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
    filterTasks: [],
  };

  addTask = (label) => {
    this.setState({
      tasks: [
        ...this.state.tasks,
        {
          id: this.state.id + 1,
          label: label,
          completed: false,
          editing: false,
          date: 'created ' + formatDistanceToNow(new Date(), { addSuffix: true }),
        },
      ],
    });
    if (this.state.filter !== 'Completed') {
      this.setState({
        filterTasks: [
          ...this.state.filterTasks,
          {
            id: this.state.id + 1,
            label: label,
            completed: false,
            editing: false,
            date: 'created ' + formatDistanceToNow(new Date(), { addSuffix: true }),
          },
        ],
      });
    }
    this.setState({ id: this.state.id + 1 });
  };

  removeTask = (id) => {
    let remove = this.state.tasks.filter((task) => task.id !== id);
    let removeFilter = this.state.filterTasks.filter((task) => task.id !== id);
    this.setState({
      tasks: remove,
      filterTasks: removeFilter,
    });
  };

  editingTask = (id, newLabel) => {
    let editing = this.state.tasks.map((task) =>
      task.id === id ? { ...task, label: newLabel, editing: false } : task
    );
    let editingFilter = this.state.filterTasks.map((task) =>
      task.id === id ? { ...task, label: newLabel, editing: false } : task
    );
    this.setState({
      tasks: editing,
      filterTasks: editingFilter,
    });
  };

  toogleCompleted = (id) => {
    let completed = this.state.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    let completedFilter = this.state.filterTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.setState({
      tasks: completed,
      filterTasks: completedFilter,
    });
  };

  toogleEditing = (id) => {
    let editing = this.state.tasks.map((task) =>
      task.id === id ? { ...task, editing: !task.editing } : task
    );
    let editingFilter = this.state.filterTasks.map((task) =>
      task.id === id ? { ...task, editing: !task.editing } : task
    );
    this.setState({
      tasks: editing,
      filterTasks: editingFilter,
    });
  };

  removeCompletedTasks = () => {
    let completedTasks = this.state.tasks.filter((task) => !task.completed);
    let completedTasksFilter = this.state.filterTasks.filter((task) => !task.completed);
    this.setState({
      tasks: completedTasks,
      filterTasks: completedTasksFilter,
    });
  };

  editingFilter = (text) => {
    this.setState({
      filter: text,
    });
    if (text === 'All') {
      this.setState((state) => (state.filterTasks = this.state.tasks));
      return;
    }
    if (text === 'Active') {
      let arr = this.state.tasks.filter((task) => !task.completed);
      this.setState((state) => (state.filterTasks = arr));
      return;
    }
    if (text === 'Completed') {
      let arr = this.state.tasks.filter((task) => task.completed);
      this.setState((state) => (state.filterTasks = arr));
      return;
    }
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
            count={this.state.filterTasks.length}
            removeCompletedTasks={this.removeCompletedTasks}
            filter={this.state.filter}
            editingFilter={this.editingFilter}
          />
        </section>
      </section>
    );
  }
}
