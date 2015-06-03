import Rx from 'rx';
import React from 'react';
import Intents from './intents';

class Tracker extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.events.on("start", this.start.bind(this));
    // this.props.events.on("stop", this.stop.bind(this));
    // this.props.events.on("reset", this.reset.bind(this));
  }

  start() {
    // Somehow send message to Stopwatch component to start incrementing elapsed
    // OR send message to <someting> to start(setInterval) to restart?
  }
  stop() {
   // Somehow send message to Stopwatch component to stop incrementing elapsed 
   // OR send message to <something> to remove(setInterval)
  }
  reset() {
   // Somehow send message to Stopwatch to set elapsed = 0;
  }

  render() {
    return <Stopwatch data={this.props.data}/>;
  }
}

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      deciSeconds: 0
    };
  }

  componentDidMount() {
    this.stateSubscription = this.props.data.stream_stopWatchState.subscribe(
        (state) => this.setState(state));
  }

  componentWillUnmount() {
    this.stateSubscription.unsubscribe(); 
  }

  render() {
    // var elapsed = this.state.elapsed;

    // var seconds = (elapsed / 10).toFixed(1);

    return <div>
            <span>{this.state.hours} : {this.state.minutes} : {this.state.seconds} : {this.state.deciSeconds}</span>
            <span>
              <StartStopBtn data={this.props.data}/>
              <ResetBtn />
            </span>
           </div>
  }
}

class StartStopBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { running: false };
    this.onToggleStart = this.onToggleStart.bind(this);
  }

  componentDidMount() {
    this.stateSubscription = this.props.data.stream_Running.subscribe(
        (state) => this.setState(state));
  }

  componentWillUnmount() {
    this.stateSubscription.unsubscribe();
  }

  onToggleStart(event) {
    // console.log("Toggle!");
    // console.log(this.state.running);
    Intents.toggleStart.onNext(!this.state.running);
  }

  startOrStop() {
    return this.state.running ? "Stop" : "Start";
  }

  render() {
    return <button onClick={this.onToggleStart}>{this.startOrStop()}</button>
  }
}

class ResetBtn extends React.Component {
  render() {
    return <h1>Reset</h1>
  }
}

export default Tracker;
