import { Component } from 'react';

export default class Task extends Component {
  state = {
    input: this.props.label,
  };

  handlerEnter = (e) => {
    if (e.code === 'Enter') {
      this.props.editingTask(this.props.id, this.state.input);
    }
  };

  render() {
    let classNames = '';

    if (this.props.completed) {
      classNames += ' completed';
    }

    if (this.props.editing) {
      classNames += ' editing';
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            defaultChecked={this.props.completed}
            onClick={() => {
              this.props.toogleCompleted(this.props.id);
            }}
          />
          <label>
            <span className="description">{this.props.label}</span>
            <span className="created">{this.props.date}</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={() => {
              this.props.toogleEditing(this.props.id);
            }}
          ></button>
          <button
            className="icon icon-destroy"
            onClick={() => {
              this.props.removeTask(this.props.id);
            }}
          ></button>
        </div>
        {this.props.editing === true ? (
          <input
            className="edit"
            type="text"
            onKeyDown={(e) => {
              this.handlerEnter(e);
            }}
            onChange={(e) => {
              this.setState({ input: e.target.value });
            }}
            value={this.state.input}
          />
        ) : null}
      </li>
    );
  }
}
