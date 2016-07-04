'use strict';

import Db from "./components/db";

const monkey = new Db();

// monkey.reset();

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    monkey.insert(request);
  });
