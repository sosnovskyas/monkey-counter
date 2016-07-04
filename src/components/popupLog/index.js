'use strict';
import Db from "./../db";
import template from "./popupLog.jade";
const monkey = new Db();

export default class PopupLog {
  constructor({log, counter}) {
    let count = 0;

    monkey.select(10, result => {
      let rows = [];

      for (let i = 0; i < result.length; i++) {
        rows.push({
          date: new Date(result[i].timestamp),
          project: result[i].project,
          uid: result[i].uid,
          result: result[i].result,
          price: result[i].price
        })
      }

      log.innerHTML = template({
        rows: rows
      });
      log.addEventListener('click', event => this._onDelete(event))
    });

    monkey.select(-1, result => {
      for (let i = 0; i < result.length; i++) {
        count = i;
      }
    });


    counter.innerHTML = 'calculating...';
    monkey.report(result => {
      counter.innerText = `processed ${count} profiles\n earn ${result}$`;
    })

  }

  _onDelete(event) {
    if (event.target.closest('button')) {
      monkey.delete(event.target.dataset.timestamp, ()=> {
        const row = event.target.parentNode.parentNode;
        row.parentNode.removeChild(row);
      });
    }
  }
}
