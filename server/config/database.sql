DROP DATABASE IF EXISTS react_trivia_app;

CREATE DATABASE react_trivia_app;

\c react_trivia_app

CREATE TABLE players (
id SERIAL PRIMARY KEY,
username VARCHAR(25) UNIQUE NOT NULL,
user_id SERIAL,
email VARCHAR(50) UNIQUE NOT NULL,
created_at TIMESTAMPTZ(6) NOT NULL,
updated_at TIMESTAMPTZ(6) NOT NULL
);

CREATE TABLE teams (
id SERIAL PRIMARY KEY,
team_name VARCHAR(25) UNIQUE NOT NULL,
created_at TIMESTAMPTZ(6) NOT NULL,
updated_at TIMESTAMPTZ(6) NOT NULL
);

CREATE TABLE team_members (
id SERIAL PRIMARY KEY,
player_id INTEGER REFERENCES players(id) ON DELETE CASCADE,
team_id INTEGER REFERENCES teams(id) ON DELETE CASCADE,
is_leader BOOLEAN,
created_at TIMESTAMPTZ(6) NOT NULL,
updated_at TIMESTAMPTZ(6) NOT NULL
);

CREATE TABLE team_rankings (
id SERIAL PRIMARY KEY,                        
cumulative_questions INTEGER,
cumulative_correct_answers INTEGER,
cumulative_incorrect_answers INTEGER,
team_id INTEGER REFERENCES teams(id) ON DELETE CASCADE,
created_at TIMESTAMPTZ(6) NOT NULL,
updated_at TIMESTAMPTZ(6) NOT NULL
);

