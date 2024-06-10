import { Component } from 'react';

export default class NewTaskForm extends Component {
  state = {
    input: '',
    min: '',
    sec: '',
  };

  handlerEnter = (e) => {
    if (this.state.input.length !== 0) {
      if (e.code === 'Enter') {
        this.props.addTask(this.state.input, this.state.min, this.state.sec);
        this.setState({
          input: '',
          min: '',
          sec: '',
        });
      }
    }
  };

  handleMin = (e) => {
    if (Number(e.target.value) >= 0 && Number(e.target.value) < 60 && e.target.value.length < 3) {
      this.setState({
        min: Number(e.target.value),
      });
    }
  };

  handleSec = (e) => {
    if (Number(e.target.value) >= 0 && Number(e.target.value) < 60 && e.target.value.length < 3) {
      this.setState({
        sec: Number(e.target.value),
      });
    }
  };

  render() {
    return (
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="Task"
          autoFocus
          value={this.state.input}
          onChange={(e) => this.setState({ input: e.target.value })}
          onKeyDown={(e) => {
            this.handlerEnter(e);
          }}
        />
        <input
          className="new-todo-form__timer"
          value={this.state.min}
          onChange={(e) => this.handleMin(e)}
          onKeyDown={(e) => {
            this.handlerEnter(e);
          }}
          placeholder="Min"
        />
        <input
          className="new-todo-form__timer"
          value={this.state.sec}
          onChange={(e) => this.handleSec(e)}
          onKeyDown={(e) => {
            this.handlerEnter(e);
          }}
          placeholder="Sec"
        />
      </form>
    );
  }
}
