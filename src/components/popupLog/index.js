'use strict';
import Db from "./../db";
import template from './popupLog.jade'

export default class PopupLog {
  constructor({elem}) {
    const monkey = new Db({name: 'monkey'});

    monkey.select(10, result => {
      let rows = [];
      for(let i = 0; i < result.length; i++){
        console.log(result[i]);
        rows.push({
          date: new Date(result[i].timestamp),
          project: result[i].project,
          uid: result[i].uid,
          result: result[i].result,
          price: result[i].price
        })
      }

      elem.innerHTML = template({
        rows: rows
      });

    })
  }
}
