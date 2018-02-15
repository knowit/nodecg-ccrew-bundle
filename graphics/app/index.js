(function () {
  'use strict';

  const safe = value => value == null ? '' : value;
  const emojify = emojione.unicodeToImage;

  const event_title = nodecg.Replicant('event_title');

  const first = nodecg.Replicant('first');
  const first_pres = nodecg.Replicant('first_pres');

  const second = nodecg.Replicant('second');
  const second_pres = nodecg.Replicant('second_pres');

  const third = nodecg.Replicant('third');
  const third_pres = nodecg.Replicant('third_pres');

  const fourth = nodecg.Replicant('fourth');
  const fourth_pres = nodecg.Replicant('fourth_pres');

  console.log("index.js GO!", event_title, first);

  const fadeIn = () => document.getElementById('text').style.opacity = "1";
  const setHtml = (id, html) => document.getElementById(id).innerHTML = emojify(safe(html));

  setTimeout(() => {
    event_title.on('change', newVal => { fadeIn(); setHtml('event_title', newVal) });

    first.on('change', newVal => setHtml('first', newVal));
    first_pres.on('change', newVal => setHtml('first_pres', newVal));

    second.on('change', newVal => setHtml('second', newVal));
    second_pres.on('change', newVal => setHtml('second_pres', newVal));

    third.on('change', newVal => setHtml('third', newVal));
    third_pres.on('change', newVal => setHtml('third_pres', newVal));

    fourth.on('change', newVal => setHtml('fourth', newVal));
    fourth_pres.on('change', newVal => setHtml('fourth_pres', newVal));
  }, 1000);
})();
