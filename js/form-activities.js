import {MINSCALE, MAXSCALE, scaleClasses, effectClasses, EFFECTS} from './constants.js';
import {getIntToFloat, removeCoincidenceClass} from './utils.js';

const scaleFieldset = document.querySelector('.img-upload__scale');
const scaleValueInput = scaleFieldset.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
let coincidenceStyle;
let chosenEffect;

// слайдер
const sliderEffectFieldset = document.querySelector('.effect-level');
const sliderEffectWrapper = sliderEffectFieldset.querySelector('.effect-level__slider');
const sliderEffectInput = sliderEffectFieldset.querySelector('.effect-level__value');
const DEFAULT = EFFECTS[0];

chosenEffect = DEFAULT;
const isDefault = () => chosenEffect === DEFAULT;
//

const previewDefault = (element, scaleDefault) => {
  previewImage.className = '';
  previewImage.style.transform = `scale(${getIntToFloat(scaleDefault) / 100})`;
};

const onScaleButton = (evt) => {
  let scaleValue = +(scaleValueInput.value.delOneLast());
  if (evt.target.classList.contains('scale__control--smaller')){
    scaleValue -= MINSCALE;
  }
  else if (evt.target.classList.contains('scale__control--bigger')){
    scaleValue += MINSCALE;
  }
  if (scaleValue < MINSCALE) {
    scaleValue = MINSCALE;
  }
  else if (scaleValue > MAXSCALE) {
    scaleValue = MAXSCALE;
  }
  const scaleValueFloat = getIntToFloat(scaleValue);

  scaleValueInput.value = `${scaleValue}%`;
  previewImage.style.transform = `scale(${scaleValueFloat / 100})`;

  const previewImageClassList = Array.from(previewImage.classList);
  removeCoincidenceClass(previewImage, previewImageClassList, scaleClasses, coincidenceStyle);

  previewImage.classList.add(`img-upload__preview--scale${scaleValueFloat}`);
};

const getSliderUpdate = () => {
  sliderEffectWrapper.classList.remove('hidden');
  sliderEffectWrapper.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });
  // if (isDefault) {
  //   sliderEffectWrapper.classList.add('hidden');
  // }
};

const onEffectsRadio = (evt) => {
  const previewImageClassList = Array.from(previewImage.classList);
  removeCoincidenceClass(previewImage, previewImageClassList, effectClasses, coincidenceStyle);
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  console.log(chosenEffect);
  getSliderUpdate();
  previewImage.classList.add(`effects__preview--${evt.target.value}`);
};

const onUpdateSliderEffect = () => {
  previewImage.style.filter = 'none';
  previewImage.style.filter = 'none';
  //допилить
  previewImage.className = '';
  //
  sliderEffectInput.value = '';
  if (isDefault()) {
    return;
  }

  const sliderValue = sliderEffectWrapper.noUiSlider.get();
  previewImage.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  sliderEffectInput.value = sliderValue;
};

noUiSlider.create(sliderEffectWrapper, {
  range: {
    min: DEFAULT.min,
    max: DEFAULT.max,
  },
  start: DEFAULT.max,
  step: DEFAULT.step,
  connect: 'lower',
});
getSliderUpdate();

sliderEffectWrapper.noUiSlider.on('update', onUpdateSliderEffect);

export {scaleFieldset, onScaleButton, effectsList, onEffectsRadio, previewImage, previewDefault, MAXSCALE};

