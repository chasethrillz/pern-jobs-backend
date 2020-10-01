CREATE DATABASE pernjobs;

CREATE TABLE job(
    job_id SERIAL PRIMARY KEY,
    title VARCHAR,
    company VARCHAR,
    link VARCHAR,
    applied BOOLEAN default false
);