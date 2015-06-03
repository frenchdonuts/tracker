import Rx from 'rx';
import Intents from './intents';

var data = {};

Intents.toggleStart.onNext(true);
/* Define time streams */
// let stream_tick = Rx.Observable.interval(100 /* ms */)
// .pausable(Intents.toggleStart);
//Hmmm...I could just make a new operator that keeps it constant
// Rename stream_toggledTick
let stream_tick = Rx.Observable.combineLatest(
    Rx.Observable.interval(100 /* ms */),
    Intents.toggleStart,
    (tick, start) => start)
  .scan(0, (acc, start) => {
    // console.log(acc);
    if (start) {
      return acc + 1;
    } else {
      return acc;
    }});

let stream_deciSeconds = stream_tick
  // reset when we hit a second
  .map((x) => (x % 10))
  .startWith(0);

let stream_seconds = stream_tick
  // emit only every second
  .filter((x) => (x % 10 === 0))
  // convert to seconds
  .map((x) => (x / 10))
  // reset when we hit a minute
  .map((x) => (x % 60))
  .startWith(0);

let stream_minutes = stream_tick
  // emit only every minute
  .filter((x) => (x % 600 === 0))
  // convert to minutes
  .map((x) => (x / 600))
  // reset when we hit an hour
  .map((x) => (x % 60))
  .startWith(0);

let stream_hours = stream_tick
  // emit only every hour
  .filter((x) => (x % 36000 === 0))
  // convert to hours
  .map((x) => (x / 36000))
  .startWith(0);

data.stream_stopWatchState = 
    Rx.Observable.combineLatest([
        stream_hours,
        stream_minutes,
        stream_seconds,
        stream_deciSeconds],
        (hours, minutes, seconds, deciSeconds) => {
          return {
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            deciSeconds, deciSeconds
          };
        });
data.stream_Running = 
  Intents.toggleStart.map((x) => { return { running: x }; });

/* Define random interval streams */
let lowerBound = 10 /* min */
let upperBound = 60 /* min */
let stream_randomIntervals = stream_minutes
  .scan(randomIntervalBetween(lowerBound, upperBound), (acc, x) => {
    if (acc === -1)
      return randomIntervalBetween(lowerBound, upperBound);
    else
      return acc - 1;
  });
let stream_shouldCheckOnUser = stream_randomIntervals
  .map((x) => {
    if (x === 0)
      return true;
    else 
      return false;
  });

stream_shouldCheckOnUser.subscribe(
    (x) => {
      if (x) {
        console.log("Take a screenshot.");
        // take screenshot
        // ask for description
      } else {
        // console.log("Do nothing");
        // do nothing
      }
    },
    (err) => {
      console.log("Error: " + err);
    });

function randomIntervalBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default data;
