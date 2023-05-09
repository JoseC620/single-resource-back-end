DROP DATABASE IF EXISTS snacks_dev;

CREATE DATABASE snacks_dev;

\c snacks_dev;

CREATE TABLE snacks (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT,
    category TEXT,
    protein NUMERIC,
    fiber NUMERIC,
    sugar NUMERIC,
    serving_size TEXT,
    is_healthy BOOLEAN
);