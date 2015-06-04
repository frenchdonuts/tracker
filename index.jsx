import Rx from 'rx';
import React from 'react';
import Tracker from './src/tracker';
import EventEmitter from './src/utils/tracker_events';
import Intents from './src/intents';
import DataStreams from './src/data';

// TODO 
// Get rid of Reset button? Just reset daily instead(and record data)?
// Another idea: allow this app to push daily data to Github/Dropbox/Google
// Use d3.js to graph productivity data?
// Make it look sexy


/* The renderz */
React.render(
  <Tracker data={DataStreams}/>,
  document.getElementById('tracker'));
