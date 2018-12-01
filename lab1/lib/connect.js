class Connect {
  constructor(name, port, dbName, schema, pass='default'){
    this.name = name;
    this.pass = pass;
    this.port = port;
    this.dbName = dbName;
    this.pgp = require('pg-promise')({schema:schema});
  }

  getDatabase(){
    return this.pgp(`postgres://${this.name}:${this.pass}@localhost:${this.port}/${this.dbName}`);
  }
}

module.exports = Connect;
