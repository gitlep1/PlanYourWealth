DROP DATABASE IF EXISTS plan_your_wealth_db;
CREATE DATABASE plan_your_wealth_db;

\c plan_your_wealth_db;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  profileimg TEXT,
  username TEXT NOT NULL,
  password TEXT,
  email TEXT UNIQUE,
  theme TEXT DEFAULT 'default',
  last_online TIMESTAMP DEFAULT NOW()
);

