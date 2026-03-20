-- ================= CREATE DATABASE =================
CREATE DATABASE IF NOT EXISTS bogtor;
USE bogtor;

-- ================= ADMINS =================
CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  gender ENUM('male','female'),
  phone VARCHAR(20),
  image_url VARCHAR(255)
);

-- ================= USERS =================
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  gender ENUM('male','female'),
  phone VARCHAR(20),
  image_url VARCHAR(255)
);

-- ================= INSERT ADMINS =================
INSERT INTO admins (name, email, password, gender, phone, image_url) VALUES
('nusteekai','nus16@gmail.com','1234','female','0811111111','https://i.pravatar.cc/150?img=1'),
('natbin','nat19@gmail.com','1234','male','0822222222','https://i.pravatar.cc/150?img=2'),
('kate','kate@gmail.com','1234','female','0833333333','https://i.pravatar.cc/150?img=3'),
('yammii','yam@gmail.com','1234','female','0844444444','https://i.pravatar.cc/150?img=4'),
('meile','mei5@gmail.com','1234','female','0855555555','https://i.pravatar.cc/150?img=5');

-- ================= INSERT USERS =================
INSERT INTO users (name, email, password, gender, phone) VALUES
('Somchai','somchai@gmail.com','1234','male','0861111111'),
('Suda','suda@gmail.com','1234','female','0862222222'),
('Anan','anan@gmail.com','1234','male','0863333333'),
('Kanya','kanya@gmail.com','1234','female','0864444444'),
('Prasert','prasert@gmail.com','1234','male','0865555555'),
('Malee','malee@gmail.com','1234','female','0866666666'),
('Narin','narin@gmail.com','1234','male','0867777777'),
('Orn','orn@gmail.com','1234','female','0868888888'),
('Wichai','wichai@gmail.com','1234','male','0869999999'),
('Pim','pim@gmail.com','1234','female','0870000000');