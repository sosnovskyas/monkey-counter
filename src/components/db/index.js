'use strict';

export default class Db {
  constructor({name = 'monkey'}) {
    this.db = this._connect(name);
  }

  _connect(name) {
    return openDatabase(name, "1.0", "Monkey DB", 20000);
  }

  select(count = 10, callback) {
    let res;
    this.db.transaction(tx => {
      const request = `SELECT * FROM profiles ORDER BY timestamp DESC LIMIT ${count}`;
      const requestGenerate = 'CREATE TABLE profiles (id REAL UNIQUE, label TEXT, timestamp REAL)';

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

  insert(profile) {
    const request = "INSERT INTO profiles (label, timestamp) values(?, ?)";

    this.db.transaction(tx => {
      tx.executeSql(request, ["profile ID", new Date().getTime()], null, null);
    });
  }

  reset() {
    const request = "DROP TABLE profiles ";
    this.db.transaction(tx => {
      tx.executeSql(request, [], null, null);
    });
  }
}
