(function () {
  'use strict';

  const safe = value => value == null ? '' : value;

  const tag = document.getElementById('tag');
  const speaker_name = nodecg.Replicant('speaker_name');

  setTimeout(() => {
    // speaker_name.on('change', newVal => { fadeIn(); document.getElementById('speaker_name').innerText = safe(newVal)});

    tag.style.transform = 'translateX(0%)';
  }, 1000);
})();

