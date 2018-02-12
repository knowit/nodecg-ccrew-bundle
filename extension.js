'use strict';

module.exports = function (nodecg) {

  // let timer = null;

  // /**
  //  * Starts the countdown at the specified startTime.
  //  * @param {string} startTime - A formatted time string, such as 1:00 for one hour.
  //  * @returns {undefined}
  //  */
  // function start(startTime) {
  //   if (running.value) {
  //     return;
  //   }

  //   const timeObj = new TimeObject(TimeObject.parseSeconds(startTime));
  //   if (timeObj.raw <= 0) {
  //     return;
  //   }

  //   running.value = true;
  //   time.value = timeObj;
  //   timer = setInterval(tick, 1000);
  // }

  // /**
  //  * Stops the countdown.
  //  * @returns {undefined}
  //  */
  // function stop() {
  //   if (!running.value) {
  //     return;
  //   }

  //   running.value = false;
  //   clearInterval(timer);
  // }

  // /**
  //  * Ticks the countdown timer down by one second, stopping the timer if it hits zero.
  //  * @returns {undefined}
  //  */
  // function tick() {
  //   TimeObject.decrement(time.value);

  //   if (time.value.raw <= 0) {
  //     stop();
  //   }
  // }

  const entry_a = nodecg.Replicant('entry_a', {defaultValue: 'Entry one!', persistent: false});

  const first = nodecg.Replicant('first', {defaultValue: 'First entry!', persistent: true});
  const second = nodecg.Replicant('second', {defaultValue: 'Second entry!', persistent: true});
  const third = nodecg.Replicant('third', {defaultValue: 'Third entry!', persistent: true});

  // const running = nodecg.Replicant('countdownRunning', {defaultValue: false, persistent: false});

  // nodecg.listenFor('entry_a', start);
  // // nodecg.listenFor('stopCountdown', stop);

};
