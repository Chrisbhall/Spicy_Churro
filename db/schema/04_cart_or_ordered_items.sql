DROP TABLE IF EXISTS ordered_items CASCADE;
CREATE TABLE ordered_items (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  cart_id INTEGER REFERENCES carts(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  size VARCHAR(255),
  spice_level SMALLINT,
  tomato BOOLEAN DEFAULT FALSE,
  lettuce BOOLEAN DEFAULT FALSE,
  beans BOOLEAN DEFAULT FALSE,
  cheese BOOLEAN DEFAULT FALSE,
  guac BOOLEAN DEFAULT FALSE,
  cilantro BOOLEAN DEFAULT FALSE,
  rice BOOLEAN DEFAULT FALSE,
  noodles BOOLEAN DEFAULT FALSE,
);
