-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
<<<<<<< HEAD
<<<<<<< HEAD
=======
  name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL,
=======
>>>>>>> 44fbfd9fab3c080acd9b0ec30e0ca6893a451caa
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone BIGINT NOT NULL,
  backup_phone BIGINT,
  password VARCHAR(255) NOT NULL
<<<<<<< HEAD
=======
  name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL,
>>>>>>> 421a40ca30b8dbddcf98ec49fb2f00a71f9e8aa0
=======
>>>>>>> 67eb1abb3c5048b50e77b3bc695d68e6f45b4679
>>>>>>> 44fbfd9fab3c080acd9b0ec30e0ca6893a451caa
);

CREATE TABLE
