'use strict';

import Db from "./components/db";

const monkey = new Db({name: 'monkey'});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log('request', request)
  });

console.log('index');
