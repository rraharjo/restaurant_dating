CREATE DATABASE cs375_group_one;
\c cs375_group_one;

DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS restaurants;

CREATE TABLE users (
    pid SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE restaurants(
    res_name TEXT PRIMARY KEY
);

CREATE TABLE votes(
    user_pid INTEGER NOT NULL,
    res_name TEXT NOT NULL,
    votes NUMERIC(3, 0) DEFAULT 0,
    PRIMARY KEY (user_pid, res_name)
);

ALTER TABLE votes 
ADD CONSTRAINT votes_user_fk 
FOREIGN KEY (user_pid) REFERENCES users (pid);

ALTER TABLE votes
ADD CONSTRAINT votes_res_fk
FOREIGN KEY (res_name) REFERENCES restaurants (res_name);