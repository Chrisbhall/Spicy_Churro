-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
<<<<<<< HEAD
  name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL,
=======
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone BIGINT NOT NULL,
  backup_phone BIGINT,
  password VARCHAR(255) NOT NULL
>>>>>>> 67eb1abb3c5048b50e77b3bc695d68e6f45b4679
);

CREATE TABLE
