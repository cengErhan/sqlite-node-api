const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("./quote.db", sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.log('hata : ', err.message);
});

const sql = `CREATE TABLE quote(ID INTEGER PRIMARY KEY, movie, quote, character)`;

db.run(sql);