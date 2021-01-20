const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 56625,
  user: 'azure',
  password: '6#vWHD_$',
  database: '323-activity',
})

connection.connect();

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("hello Noah");
});

/**
 * Inserting a user through a post method
 */
app.post('/api/insert', (req, res) => {

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const favColor = req.body.favColor;
  const favTeam = req.body.favTeam;

  console.log("inserting a user with a first name of: " + firstName);

  const sqlInsert = `INSERT INTO users (id, firstName, lastName, favColor, favTeam) VALUES (null, '${firstName}', '${lastName}', '${favColor}', '${favTeam}' );`;
  connection.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(result);
    res.send(result);
  });
});

/**
 * deleting an existing user through a post method
 */
app.post('/api/delete', (req, res) => {

  const id = req.body.id;
  console.log("deleting the user with an id of: " + id)

  const sqlInsert = `DELETE from users WHERE id = ${id};`;
  connection.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(result);
    res.send(result);
  });
});

/**
 * gets an exisitng user through a url parameter from a get method 
 */
app.get('/api/get/:id', (req, res) => {

  const id = req.params.id;

  console.log("id", id);

  const sql = `SELECT * from users where id = ${id};`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(result);
    res.send(result);
  });
})

/**
 * updates an exisitng user from a post method
 */
app.post('/api/update', (req, res) => {

  const id = req.body.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const favColor = req.body.favColor;
  const favTeam = req.body.favTeam;


  const sqlInsert = `UPDATE users set firstName = '${firstName}', lastName = '${lastName}', favColor = '${favColor}', favTeam = '${favTeam}' where id = ${id};`;
  connection.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(result);
    res.send(result);
  });
});

/**
 * gets all users from a database
 */
app.get('/api/get', (req, res) => {
  const sql = `SELECT * from users;`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.send(result);
  });
})

app.listen(3001, () => {
  console.log("running on port 3001");
});

