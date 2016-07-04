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
      const request = `SELECT * FROM profiles ORDER BY timestamp DESC LIMIT ${count}`;
      const requestGenerate = 'CREATE TABLE profiles (id REAL UNIQUE, timestamp REAL, project  TEXT, uid  TEXT, result  TEXT, price REAL)';

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
      const startOfDay = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())/ 1000;
      const request = `SELECT * FROM profiles WHERE timestamp >= ${startOfDay}`;
      tx.executeSql(request, [],

        // successful
        (tx, result)=> {
          let res = parseFloat(0);
          for (let i = 0; i < result.rows.length; i++) {
            console.log(result.rows[i]);
            if (!Number.isNaN(parseFloat(result.rows[i].price))) {
              // float fix
              res = (10000 * res + 10000 * parseFloat(result.rows[i].price)) / 10000;
            }
          }
          callback(res);
        },

        // err
        null
      )
    });
  }

  insert(obj) {
    const request = "INSERT INTO profiles (timestamp , project, uid, result, price) values(?, ?, ?, ?, ?)";
    const profile = JSON.parse(obj);

    this.db.transaction(tx => {
      tx.executeSql(request, [
          new Date().getTime(),
          profile.project,
          profile.uid,
          profile.result,
          profile.price
        ], null,
        (tx, err)=> console.warn(err));
    });
  }

  reset() {
    const request = "DROP TABLE profiles ";
    this.db.transaction(tx => {
      tx.executeSql(request, [], null, null);
    });
  }
}
