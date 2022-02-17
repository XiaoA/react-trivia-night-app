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


-- INSERT INTO players
-- (id, username, created_at, updated_at)
-- VALUES
-- (1, 'sherlock99', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- (2, 'batman4u', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- (3, 'catfancy', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- (4, 'anonuser82', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- INSERT INTO teams
-- (id, team_name, created_at, updated_at)
-- VALUES
-- (1, 'Team 1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- (2, 'Team 2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- (3, 'Team 3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- (4, 'Team 4', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- INSERT INTO team_members
-- (id, player_id, team_id, is_leader, created_at, updated_at)
-- VALUES
-- (1, 1, 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- (2, 2, 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- (3, 3, 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- (4, 2, 1, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- INSERT INTO team_rankings
-- (id, cumulative_questions, cumulative_correct_answers, cumulative_incorrect_answers, team_id, created_at, updated_at)
-- VALUES
-- (1, 100, 70, 30, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- (2, 25, 18, 17, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- (3, 5, 2, 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- (4, 85, 65, 20, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

