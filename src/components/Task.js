import { Component } from 'react';

export default class Task extends Component {
  state = {
    input: this.props.label,
    defaultInput: this.props.label,
    time: {},
    seconds: this.props.sec + this.props.min * 60,
    runTimer: false,
  };

  handlerKeyDown = (e) => {
    if (e.code === 'Enter') {
      this.props.editingTask(this.props.id, this.state.input);
      this.setState((state) => ({ defaultInput: state.input }));
    }

    if (e.code === 'Escape') {
      this.props.editingTask(this.props.id, this.state.defaultInput);
      this.setState((state) => ({ input: state.defaultInput }));
    }
  };

  secondsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours < 10 ? '0' + hours : hours,
      m: minutes < 10 ? '0' + minutes : minutes,
      s: seconds < 10 ? '0' + seconds : seconds,
    };
    return obj;
  };

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer = () => {
    if (this.state.runTimer) {
      return;
    }
    if (!this.props.completed) {
      this.setState({ runTimer: true });
      this.timer = setInterval(this.countDown, 1000);
    }
  };

  countDown = () => {
    if (this.state.runTimer) {
      let seconds = this.state.seconds + 1;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
    }

    if (!this.state.runTimer) {
      clearInterval(this.timer);
    }
  };

  taskCompleted() {
    this.props.toogleCompleted(this.props.id);
    clearInterval(this.timer);
    if (this.props.completed) {
      this.setState({ runTimer: false });
    }
  }

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
              this.taskCompleted();
            }}
          />
          <label>
            <span className="title">{this.props.label}</span>
            <span className="description">
              <button className="icon icon-play" onClick={this.startTimer}></button>
              <button
                className="icon icon-pause"
                onClick={() => this.setState({ runTimer: false })}
              ></button>
              <span className="timer">{`${this.state.time.m}:${this.state.time.s}`}</span>
            </span>
            <span className="description">{this.props.date}</span>
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
              this.handlerKeyDown(e);
            }}
            onChange={(e) => {
              this.setState({ input: e.target.value });
            }}
            value={this.state.input}
            autoFocus
          />
        ) : null}
      </li>
    );
  }
}
