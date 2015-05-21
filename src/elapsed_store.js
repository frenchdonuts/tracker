// require Dispatcher
// var AppDispatcher = 
import assign from 'object-assign';
import events from 'events';

var EventEmitter = events.EventEmitter;

var TICK_EVENT = 'tick';

// Move this to a different module
// setInterval will interact with TimeStore through AppDispatcher
var ticker = setInterval(tick, 1000);

var elapsed = 0;


function start() {

}

function stop() {

}

function reset() {

}


var TimeStore = assign({}, EventEmitter.prototype, {
  getElapsed() {
    return elapsed;
  }

  emitChange() {
    this.emit(TICK_EVENT);
});

var tickEvents;
tickEvents.reduce((elapsedAcc, tick) => {
  return elapsedAcc + 1;
})
