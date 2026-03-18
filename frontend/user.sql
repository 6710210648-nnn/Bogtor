-- สร้างฐานข้อมูล
CREATE DATABASE bogtor_db;
USE bogtor_db;

-- =====================
-- 👤 USERS
-- =====================
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  gender VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- เพิ่มผู้ใช้ 20 คน
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

CREATE TABLE foods (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  location VARCHAR(255),
  rating FLOAT DEFAULT 0
);

INSERT INTO foods (name, description, location, rating) VALUES
('ผัดไทย','อร่อยมาก','กรุงเทพ',4.5),
('ต้มยำกุ้ง','เผ็ดจัดจ้าน','กรุงเทพ',4.7),
('ข้าวมันไก่','นุ่มอร่อย','หาดใหญ่',4.2),
('ก๋วยเตี๋ยว','น้ำซุปเข้มข้น','เชียงใหม่',4.3),
('ส้มตำ','แซ่บมาก','อีสาน',4.8);

CREATE TABLE places (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  location VARCHAR(255),
  rating FLOAT DEFAULT 0
);

INSERT INTO places (name, description, location, rating) VALUES
('ทะเลพัทยา','วิวสวย น้ำใส','ชลบุรี',4.5),
('ดอยอินทนนท์','ภูเขาสูง อากาศดี','เชียงใหม่',4.9),
('เกาะสมุย','ทะเลสวย','สุราษฎร์ธานี',4.7),
('ภูทับเบิก','หมอกสวย','เพชรบูรณ์',4.6),
('เกาะหลีเป๊ะ','น้ำใสมาก','สตูล',4.9);


CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  food_id INT,
  place_id INT,
  comment TEXT,
  rating INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (food_id) REFERENCES foods(id),
  FOREIGN KEY (place_id) REFERENCES places(id)
);

INSERT INTO reviews (user_id, food_id, place_id, comment, rating) VALUES
(1,1,NULL,'อร่อยมาก',5),
(2,2,NULL,'เผ็ดดี',4),
(3,NULL,1,'วิวสวย',5),
(4,NULL,2,'อากาศดีมาก',5),
(5,3,NULL,'โอเค',4),
(6,NULL,3,'ทะเลสวย',5);


CREATE TABLE favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  food_id INT,
  place_id INT,

  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO favorites (user_id, food_id, place_id) VALUES
(1,1,NULL),
(2,2,NULL),
(3,NULL,1),
(4,NULL,2),
(5,3,NULL);