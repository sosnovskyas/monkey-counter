'use strict';
import Db from "./components/db";

const monkey = new Db();

document.querySelector('.reset-db').addEventListener('click', ()=> confirm('You sure?') ? monkey.reset() : null);
document.querySelector('.reset-shift').addEventListener('click', ()=> confirm('You sure?') ? localStorage['shift'] = 1 : null);
