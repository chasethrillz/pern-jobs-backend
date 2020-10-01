const pool = require('./db');

const createTable = "CREATE TABLE jobs(job_id serial PRIMARY KEY,title varchar,company varchar,link varchar,applied boolean default false,created_at timestamp default current_timestamp,applied_at timestamp,reply varchar,notes text);"

const addCity = 'ALTER TABLE jobs ADD COLUMN city VARCHAR;'
pool.query(addCity);