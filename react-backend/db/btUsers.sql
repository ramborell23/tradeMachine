DROP DATABASE IF EXISTS btUsers;
CREATE DATABASE btUsers;
\c btUsers;

Drop TABLE Users;
-- CASCADE;
CREATE TABLE Users
(
    id SERIAL UNIQUE,
    first_name VARCHAR,
    last_name VARCHAR,
    username VARCHAR UNIQUE,
    password_digest VARCHAR NOT NULL,
    email VARCHAR,
    PRIMARY KEY (id)
);


