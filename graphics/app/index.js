(function () {
  'use strict';

  const safe = value => value == null ? '' : value;

  const event_title = nodecg.Replicant('event_title');

  const first = nodecg.Replicant('first');
  const first_pres = nodecg.Replicant('first_pres');
  const second = nodecg.Replicant('second');
  const second_pres = nodecg.Replicant('second_pres');
  const third = nodecg.Replicant('third');
  const third_pres = nodecg.Replicant('third_pres');

  console.log("index.js GO!", event_title, first);

  const fadeIn = () => document.getElementById('text').style.opacity = "1";

  setTimeout(() => {
    event_title.on('change', newVal => { fadeIn(); document.getElementById('event_title').innerText = safe(newVal)});

    first.on('change', newVal => document.getElementById('first').innerText = safe(newVal));
    first_pres.on('change', newVal => document.getElementById('first_pres').innerText = safe(newVal));
    second.on('change', newVal => document.getElementById('second').innerText = safe(newVal));
    second_pres.on('change', newVal => document.getElementById('second_pres').innerText = safe(newVal));
    third.on('change', newVal => document.getElementById('third').innerText = safe(newVal));
    third_pres.on('change', newVal => document.getElementById('third_pres').innerText = safe(newVal));
  }, 1000);
})();
