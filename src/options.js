'use strict';
import Db from "./components/db";

const monkey = new Db();

document.querySelector('.reset-db').addEventListener('click', ()=> monkey.reset());
