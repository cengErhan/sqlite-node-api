const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const url = require('url');
let sql;

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./quote.db', sqlite.OPEN_READWRITE, (err) => {
  if (err) return console.log('hata : ', err.message);
});

app.use(bodyParser.json());

app.post('/quote', (req,res)=>{
    try {
        const { movie, quote, character } = req.body;
        sql = "INSERT INTO quote(movie,quote,character) VALUES(?,?,?)";
        db.run(sql, [movie,quote,character], (err)=>{
            if(err) return res.json({
                status: 300,
                success: false,
                error: err,
            });
        });
        res.json({
            status: 200,
            success: true,
        });
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
})

app.get("/quote", (req,res) => {
    sql = "SELECT * FROM quote";
    try {
        db.all(sql, [], (err, rows)=>{
            if(err) return res.json({
                status: 300,
                success: false,
                error: err,
            });

            if(rows.length < 1) return res.json({
                status: 300,
                success: false,
                error: "No match",
            });

            return res.json({
                status: 200,
                data: rows,
                success: true,
            });
        });
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
});
app.listen(3000);
