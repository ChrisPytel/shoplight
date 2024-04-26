DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description text,
  photo_url VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  is_featured BOOLEAN,
  is_available BOOLEAN default TRUE,
  date_posted TIMESTAMP default CURRENT_TIMESTAMP
);