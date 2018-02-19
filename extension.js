'use strict';

module.exports = function (nodecg) {

  const event_title = nodecg.Replicant('event_title', {defaultValue: '', persistent: true});

  const first = nodecg.Replicant('first', {defaultValue: '', persistent: true});
  const first_pres = nodecg.Replicant('first_pres', {defaultValue: '', persistent: true});
  const second = nodecg.Replicant('second', {defaultValue: '', persistent: true});
  const second_pres = nodecg.Replicant('second_pres', {defaultValue: '', persistent: true});
  const third = nodecg.Replicant('third', {defaultValue: '', persistent: true});
  const third_pres = nodecg.Replicant('third_pres', {defaultValue: '', persistent: true});
  const fourth = nodecg.Replicant('third', {defaultValue: '', persistent: true});
  const fourth_pres = nodecg.Replicant('fourth_pres', {defaultValue: '', persistent: true});

  const speaker_name = nodecg.Replicant('speaker_name', {defaultValue: '', persistent: true});
  const presentation_title = nodecg.Replicant('presentation_title', {defaultValue: '', persistent: true});

  // follows schemas/speakerList.json:
  nodecg.Replicant('speakerList', { defaultValue: [], persistent: true });
};
