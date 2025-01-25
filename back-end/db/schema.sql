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

DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions (
  id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  transaction_name TEXT NOT NULL,
  transaction_type TEXT NOT NULL,
  transaction_amount DECIMAL NOT NULL,
  transaction_date DATE NOT NULL,
  transaction_category TEXT,
  transaction_note TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

DROP TABLE IF EXISTS investments;
CREATE TABLE investments (
  id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  investment_name TEXT NOT NULL,
  investment_amount DECIMAL NOT NULL,
  investment_date DATE NOT NULL,
  investment_category TEXT,
  investment_note TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

DROP TABLE IF EXISTS goals;
CREATE TABLE goals (
  id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  goal_name TEXT NOT NULL,
  goal_amount DECIMAL NOT NULL,
  goal_date DATE NOT NULL,
  goal_category TEXT,
  goal_note TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
