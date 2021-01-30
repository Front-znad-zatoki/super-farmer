import { Render } from './utils/Render';

const ModeModal = () => {
  // Heading
  const modalHeading = Render.elementFactory(
    "span",
    { className: 'mode-modal__heading'},
  )

  // Game mode
  
  const gameModeSpan = Render.elementFactory(
    "span",
    { className: 'game-mode__span' },
    'Game mode',
  )

  const CheckStandard = Render.elementFactory(
    "input",
    { type:'checkbox', name:'Standard' }
  )
  const LabelStandard = Render.elementFactory(
    "label",
    { for:'Standard' },
    'Standard',
  )

   const Standard = Render.elementFactory(
    "div",
    { className: 'standard-mode' },
    CheckStandard, LabelStandard,
   )
      
  const CheckDynamic = Render.elementFactory(
    "input",
    { type:'checkbox', name:'Dynamic' }
  )

  const gameMode = Render.elementFactory(
    "div",
    { className: 'mode-modal__game-mode' },
    gameModeSpan, CheckStandard, CheckDynamic,
  )

  // Number of players 

  const numberOfPlayers = Render.elementFactory(
    "div",
    { className: 'mode-modal__players'},
  )

  // Button

  const nextButton = Render.elementFactory(
    "button",
    { type:'button' }
  )

  modalHeading.textContent = 'Select the gameplay preferences';

  const modeModal = Render.elementFactory(
    "div",
    { className: 'mode-modal' },
    modalHeading, gameMode, numberOfPlayers, nextButton
  );
  const id = document.querySelector('#sf-app');
  // id.appendChild(modeModal)
}

export default ModeModal;