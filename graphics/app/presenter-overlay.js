(function () {
  'use strict';

  const safe = value => value == null ? '' : value;

  const speaker_name = nodecg.Replicant('speaker_name');
  const presentation_title = nodecg.Replicant('presentation_title');
  const presenter_overlay_show = nodecg.Replicant('presenter_overlay_show');

  setTimeout(() => {
    speaker_name.on('change', newVal => document.getElementById('speaker_name').innerText = newVal);
    presentation_title.on('change', newVal => document.getElementById('presentation_title').innerText = newVal);

    presenter_overlay_show.on('change', newVal => {
      const tag = document.getElementById('tag');

      if (newVal) {
        console.log("NEW VAL -> SHOW", newVal);
        tag.style.transform = 'translate3d(0%,0,0)';
      } else {
        console.log("NEW VAL -> HIDE", newVal);
        tag.style.transform = 'translate3d(-100%,0,0)';
      }

    });

  }, 1000);
})();

