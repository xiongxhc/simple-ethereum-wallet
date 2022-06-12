CREATE DATABASE simple_ethereum_wallet_db;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    uid uuid DEFAULT uuid_generate_v4 (),
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    eth_address VARCHAR(255) UNIQUE NOT NULL,
    created_on TIMESTAMP NOT NULL,
    PRIMARY KEY(uid)
);