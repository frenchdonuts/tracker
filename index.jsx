import React from 'react';
import Tracker from './src/tracker';
import EventEmitter from './src/utils/tracker_events';
import shouldCheck from './src/utils/random_interval';

setInterval(() => EventEmitter.emit("tick"), 1000);

EventEmitter.on("tick", () => {
  if (shouldCheck.next()) {
    // captureScreenshot();
    // askForDescription();
  }
});

React.render(
  <Tracker events={EventEmitter}/>,
  document.getElementById('tracker')
)
