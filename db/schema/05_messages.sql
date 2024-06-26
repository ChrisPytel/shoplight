DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  message TEXT NOT NULL,
  user_id_to INTEGER REFERENCES users(id) NOT NULL,
  user_id_from INTEGER REFERENCES users(id) NOT NULL,
  product_id INTEGER REFERENCES products(id) NOT NULL,
  date_sent TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_status BOOL DEFAULT false
);
