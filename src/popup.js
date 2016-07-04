'use strict';

import PopupLog from "./components/popupLog";

new PopupLog({
  log: document.querySelector('.log'),
  counter: document.querySelector('.counter')
});
