'use strict';

export default class Db {
  constructor(name = 'monkey') {
    this.db = this._connect(name)
  }

  _connect(name) {
    return openDatabase(name, "1.0", "Monkey DB", 20000);
  }

  select() {
    this.db.transaction(tx => {
      const request = 'SELECT COUNT(*) FROM profiles';
      const requestGenerate = 'CREATE TABLE ToDo (id REAL UNIQUE, label TEXT, timestamp REAL)';

      tx.executeSql(request, [],

        // successful
        (tx, result)=> {
          return 'ok';
        },

        // error
        (tx, error) => {
          tx.executeSql(requestGenerate, [], null, null);
        }
      )
    });
  }

  insert(profile) {
    const request = "INSERT INTO ToDo (label, timestamp) values(?, ?)";

    db.transaction(tx => {
      tx.executeSql(request, ["profile ID", new Date().getTime()], null, null);
    });
  }
}
