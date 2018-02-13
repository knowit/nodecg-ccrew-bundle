'use strict';

module.exports = function (nodecg) {

  const first = nodecg.Replicant('first', {defaultValue: '', persistent: true});
  const first_pres = nodecg.Replicant('first', {defaultValue: '', persistent: true});
  const second = nodecg.Replicant('second', {defaultValue: '', persistent: true});
  const second_pres = nodecg.Replicant('second', {defaultValue: '', persistent: true});
  const third = nodecg.Replicant('third', {defaultValue: '', persistent: true});
  const third_pres = nodecg.Replicant('third', {defaultValue: '', persistent: true});

  // const running = nodecg.Replicant('countdownRunning', {defaultValue: false, persistent: false});

  // nodecg.listenFor('entry_a', start);
  // // nodecg.listenFor('stopCountdown', stop);

};
