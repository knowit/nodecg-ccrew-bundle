(function () {
  'use strict';

  const safe = value => value == null ? '' : value;

  const first = nodecg.Replicant('first');
  const second = nodecg.Replicant('second');
  const third = nodecg.Replicant('third');

  console.log("index.js GO!", first, second, third);
  setTimeout(() => {
    first.on('change', newVal => { console.log("first got:", newVal); document.getElementById('first').innerText = safe(newVal) });
    second.on('change', newVal => { console.log("second got:", newVal); document.getElementById('second').innerText = safe(newVal) });
    third.on('change', newVal => { console.log("third got:", newVal); document.getElementById('third').innerText = safe(newVal) });
  }, 1000);
})();
