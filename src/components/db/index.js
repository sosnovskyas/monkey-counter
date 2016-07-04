'use strict';

export default class Db {
  constructor(name = 'monkey') {
    this.db = this._connect(name);

    this.select(1, ()=> null)
  }

  _connect(name) {
    return openDatabase(name, "1.0", "Monkey DB", 20000);
  }

  select(count = 10, callback) {
    this.db.transaction(tx => {
      const request = `SELECT * FROM profiles WHERE shift >= ${localStorage['shift']} ORDER BY timestamp DESC LIMIT ${count} `;
      const requestGenerate = 'CREATE TABLE profiles (id REAL UNIQUE, timestamp REAL, shift TEXT, project  TEXT, uid  TEXT, result  TEXT, price REAL)';

      tx.executeSql(request, [],

        // successful
        (tx, result)=> {
          callback(result.rows);
        },

        // error
        (tx, error) => {
          tx.executeSql(requestGenerate, [], null, null);
        }
      )
    });
  }

  report(callback) {
    this.db.transaction(tx => {
      const request = `SELECT * FROM profiles WHERE shift >= ${localStorage['shift']}`;
      tx.executeSql(request, [],

        // successful
        (tx, result)=> {
          let res = parseFloat(0);
          for (let i = 0; i < result.rows.length; i++) {
            if (!Number.isNaN(parseFloat(result.rows[i].price))) {
              // float fix
              res = (1000 * res + 1000 * parseFloat(result.rows[i].price)) / 1000;
            }
          }
          console.log('report done');
          callback(res);
        },

        // err
        (tx, err) => console.log(err)
      )
    });
  }

  insert(obj) {
    const request = "INSERT INTO profiles (timestamp, shift, project, uid, result, price) values(?, ?, ?, ?, ?, ?)";
    const profile = JSON.parse(obj);

    this.db.transaction(tx => {
      tx.executeSql(request, [
          new Date().getTime(),
          localStorage['shift'],
          profile.project,
          profile.uid,
          profile.result,
          profile.price
        ], ()=>console.log('insert done'),
        (tx, err)=> console.warn(err));
    });
  }

  delete(timestamp, callback) {
    const request = `DELETE FROM profiles WHERE timestamp = ${timestamp}`;

    this.db.transaction(tx => {
      tx.executeSql(request, [],
        ()=> {
          console.log('delete done');
          callback();
        },
        (tx, err)=> console.warn(err));
    });
  }

  reset() {
    const request = "DROP TABLE profiles";
    this.db.transaction(tx => {
      tx.executeSql(request, [], null, null);
    });
  }
}
