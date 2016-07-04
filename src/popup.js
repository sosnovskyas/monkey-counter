'use strict';
import Db from "./components/db";

const monkey = new Db({name: 'monkey'});

const log = document.querySelector('.log');

log.innerHTML = 'test';


monkey.select(10, result => {
  log.innerHTML = JSON.stringify(result);
})
