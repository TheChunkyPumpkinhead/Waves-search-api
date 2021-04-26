DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS user_locations;


CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  email VARCHAR (255) UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE locations (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  image TEXT,
  title TEXT NOT NULL,
  content TEXT,
  keyword TEXT NOT NULL,
  is_public BOOLEAN
  );

CREATE TABLE ratings (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE,
  stars INTEGER,
  unique (user_id, location_id),
);

-- create new table with user_id & location_id to post into 
CREATE TABLE user_locations (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE, 
  unique (user_id, location_id)
);


CREATE TABLE comments (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  user_location_id INTEGER REFERENCES user_locations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  -- author id so that it can reference it when adding comments and not show on public locations? 
  author_id INTEGER REFERENCES users(id)
);



-- can add in a way to make sure that no duplicates are saved with unique