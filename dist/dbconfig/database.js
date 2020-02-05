'use strict';

var _dotenv = require('dotenv')
var _dotenv2 = _interopRequireDefault(_dotenv);

var _pg = require('pg');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var connectionString = process.env.DATABASE_URL;
var client = new _pg.Client({
  connectionString: connectionString
});
client.connect(function (err) {
  if (err) {
    console.log(err.message);
  }
});

var userTableQuery = 'CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(255) not null, email VARCHAR(225) UNIQUE not null, password TEXT not null, created_at DATE not null, updated_at DATE not null)';
var entriesTableQuery = 'CREATE TABLE entries(id SERIAL PRIMARY KEY, title TEXT not null, content TEXT not null, user_id INTEGER not null, created_at DATE not null, updated_at DATE not null)';

var tableQuery = userTableQuery + ' ; ' + entriesTableQuery;
client.query(tableQuery, function (error) {
  client.end();
  if (error) {
    console.log(error.message);
    return;
  }
  console.log('Migrations successful');
}); 
