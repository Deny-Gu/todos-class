import { Component } from 'react';

export default class NewTaskForm extends Component {
  state = {
    input: '',
  };

  handlerEnter = (e) => {
    if (e.code === 'Enter') {
      this.props.addTask(this.state.input);
      this.setState({
        input: '',
      });
    }
  };

  render() {
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={this.state.input}
        onChange={(e) => this.setState({ input: e.target.value })}
        onKeyDown={(e) => {
          this.handlerEnter(e);
        }}
      />
    );
  }
}
