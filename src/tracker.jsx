import React from 'react';

class Tracker extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.events.on("start", this.start.bind(this));
    this.props.events.on("stop", this.stop.bind(this));
    this.props.events.on("reset", this.reset.bind(this));
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
    return <Stopwatch events={this.props.events}/>;
  }
}

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { elapsed: 0 };
  }

  componentDidMount() {
    this.props.events.on("tick", this.tick.bind(this));
  }

  componentWillUnmount() {
    //clearInterval(this.timer);
  }

  tick() {
    this.setState({elapsed: this.state.elapsed + 1});
  }

  render() {
    var elapsed = this.state.elapsed;

    var seconds = (elapsed / 10).toFixed(1);

    return <div>
            <h3>{elapsed} seconds</h3>
            <span>
              <TheButton events={this.props.events}/>
            </span>
           </div>
  }
}

class TheButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h7>Start</h7>
  }
}

export default Tracker;

