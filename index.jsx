import Rx from 'rx';
import React from 'react';
import Tracker from './src/tracker';
import EventEmitter from './src/utils/tracker_events';
import Intents from './src/intents';
import Data from './src/data';

/* The renderz */
React.render(
  <Tracker data={Data}/>,
  document.getElementById('tracker'));
