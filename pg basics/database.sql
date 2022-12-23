CREATE DATABASE user_database;

--\c into user_database

--Create the table for user
CREATE TABLE user_list(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255)
);