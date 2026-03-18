-- สร้างฐานข้อมูล
CREATE DATABASE bogtor_db;
USE bogtor_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  gender VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password, gender) VALUES
('nusteekai','nus16@gmail.com','1234','famale'),
('natbin','nat19@gmail.com','1234','male'),
('kate','kate@gmail.com','1234','male'),
('yammii','yam@gmail.com','1234','female'),
('meile','mei5@gmail.com','1234','famale'),
('teameiei','team@gmail.com','1234','male'),
('mk','mink@gmail.com','1234','famale'),
('aung','aaa@gmail.com','1234','female'),
('User9','user9@gmail.com','1234','male'),
('User10','user10@gmail.com','1234','female'),
('User11','user11@gmail.com','1234','male'),
('User12','user12@gmail.com','1234','female'),
('User13','user13@gmail.com','1234','male'),
('User14','user14@gmail.com','1234','female'),
('User15','user15@gmail.com','1234','male'),
('User16','user16@gmail.com','1234','female'),
('User17','user17@gmail.com','1234','male'),
('User18','user18@gmail.com','1234','male'),
('User19','user19@gmail.com','1234','male'),
('User20','user20@gmail.com','1234','male');
