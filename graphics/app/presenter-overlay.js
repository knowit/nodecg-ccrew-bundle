(function () {
  'use strict';

  const safe = value => value == null ? '' : value;

  const speaker_name = nodecg.Replicant('speaker_name');
  const presentation_title = nodecg.Replicant('presentation_title');
  const presenter_overlay_show = nodecg.Replicant('presenter_overlay_show');

  setTimeout(() => {
    presenter_overlay_show.on('change', newVal => {
      const tag = document.getElementById('tag');

      if (newVal) {
        console.log("NEW VAL -> SHOW", newVal);
        tag.style.transform = 'translateX(0%)';
      } else {
        console.log("NEW VAL -> HIDE", newVal);
        tag.style.transform = 'translateX(-100%)';
      }

    });

  }, 1000);
})();

