-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 28, 2026 at 02:29 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bogtor`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `gender`, `phone`, `image_url`) VALUES
(1, 'nusteekai', 'nus16@gmail.com', '1234', 'female', '0811111111', 'https://i.pravatar.cc/150?img=1'),
(2, 'natbin', 'nat19@gmail.com', '1234', 'male', '0822222222', 'https://i.pravatar.cc/150?img=2'),
(3, 'kate', 'kate@gmail.com', '1234', 'female', '0833333333', 'https://i.pravatar.cc/150?img=3'),
(4, 'yammii', 'yam@gmail.com', '1234', 'female', '0844444444', 'https://i.pravatar.cc/150?img=4'),
(5, 'meile', 'mei5@gmail.com', '1234', 'female', '0855555555', 'https://i.pravatar.cc/150?img=5');

-- --------------------------------------------------------

--
-- Table structure for table `travel`
--

CREATE TABLE `travel` (
  `id` int(11) NOT NULL,
  `title_th` varchar(255) NOT NULL,
  `title_en` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `location_address` text NOT NULL,
  `map_url` text NOT NULL,
  `opening_hours` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` varchar(49) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `travel`
--

INSERT INTO `travel` (`id`, `title_th`, `title_en`, `description`, `location_address`, `map_url`, `opening_hours`, `image`, `category`) VALUES
(1, 'ตลาดกิมหยง', 'Kim Yong Market', 'ศูนย์รวมของฝากจากต่างประเทศ ผลไม้สด ผลไม้อบแห้ง และถั่วนานาชนิดที่เป็นเอกลักษณ์ของเมืองหาดใหญ่', 'ถนนศุภสารรังสรรค์ ตำบลหาดใหญ่ อำเภอหาดใหญ่ จังหวัดสงขลา', '', '06:00 - 18:00 น.', '/gimyong.jpg', 'ตลาด/ช้อปปิ้ง'),
(2, 'สวนสาธารณะเทศบาลนครหาดใหญ่', 'Hat Yai Municipal Park', 'แลนด์มาร์คสำคัญที่มีกระเช้าลอยฟ้า พระพุทธมงคลมหาราช และจุดชมวิวเมืองหาดใหญ่แบบ 360 องศา', 'ถนนกาญจนวนิช ตำบลคอหงส์ อำเภอหาดใหญ่ จังหวัดสงขลา', '', '05:00 - 20:00 น.', '/HatyaiPark.jpg', 'ธรรมชาติ'),
(3, 'ตลาดน้ำคลองแห', 'Khlong Hae Floating Market', 'ตลาดน้ำแห่งแรกของภาคใต้ สัมผัสวิถีชีวิตชาวบ้าน ชิมอาหารท้องถิ่นที่ขายบนเรือพาย และใช้ภาชนะจากธรรมชาติ', 'ตำบลคลองแห อำเภอหาดใหญ่ จังหวัดสงขลา', '', '13:00 - 21:00 น', '/คลองเเห.jpg', 'ตลาด/ช้อปปิ้ง'),
(4, 'วัดหาดใหญ่ใน', 'Mahattamangkalaram', 'ตลาดน้ำแห่งแรกของภาคใต้ สัมผัสวิถีชีวิตชาวบ้าน ชิมอาหารท้องถิ่นที่ขายบนเรือพาย และใช้ภาชนะจากธรรมชาติ', 'ถนนเพชรเกษม อำเภอหาดใหญ่ จังหวัดสงขลา', '', '07:00 - 18:00 น.', '/วัดหาดใหญ่ใน.jpg', 'ศาสนา'),
(5, 'น้ำตกโตนงาช้าง', 'Ton Nga Chang Waterfall', 'น้ำตกที่มีชื่อเสียงระดับจังหวัด มีทั้งหมด 7 ชั้น โดยเฉพาะชั้นที่ 3 (งาช้าง) ที่มีความสวยงามเป็นพิเศษ', 'เขตรักษาพันธุ์สัตว์ป่าโตนงาช้าง อำเภอหาดใหญ่ จังหวัดสงขลา', '', '09:00 - 16:00 น.', '/โตนงาช้าง.jpg', 'ธรรมชาติ'),
(6, 'เซ็นทรัล หาดใหญ่', 'Central Hatyai', 'ห้างสรรพสินค้าที่ใหญ่และทันสมัยที่สุดในหาดใหญ่ ครบครันด้วยสินค้าและบริการ', 'ถนนกาญจนวณิช อำเภอหาดใหญ่ จังหวัดสงขลา', '', '10:00 - 21:00 น.', '/เซนทรัล.jpg', 'ตลาด/ช้อปปิ้ง'),
(7, 'มัสยิดกลางประจำจังหวัดสงขลา', 'Songkhla Central Mosque', 'ศาสนสถานอันวิจิตรงดงาม เป็นศูนย์รวมจิตใจของชาวมุสลิมและเป็นจุดถ่ายภาพยอดนิยม', 'ตำบลคลองแห อำเภอหาดใหญ่ จังหวัดสงขลา', '', '08:30 - 15:30 น.', '', 'ศาสนา'),
(8, 'วัดฉื่อฉาง', 'Tse Chang Temple', 'วัดจีนที่มีสถาปัตยกรรมโดดเด่น และเป็นศูนย์กลางการจัดงานเทศกาลสำคัญของชาวไทยเชื้อสายจีน', 'ถนนศุภสารรังสรรค์ อำเภอหาดใหญ่ จังหวัดสงขลา', '', '07:00 - 19:00 น.', '/ฉือฉาง.jpg', 'ศาสนา'),
(9, 'ตลาดกรีนเวย์ไนท์มาร์เก็ต', 'Greenway Night Market', 'ตลาดนัดกลางคืนยอดนิยม แหล่งรวมเสื้อผ้าแฟชั่น สินค้ามือสอง และโซนอาหารที่หลากหลาย', 'ถนนกาญจนวณิชย์ อำเภอหาดใหญ่ จังหวัดสงขลา', '', '17:00 - 22:00 น.', '/กรีนเว.jpg', 'ตลาด/ช้อปปิ้ง'),
(10, 'พระมหาธาตุเจดีย์ไตรภพไตรมงคล', 'Maha That Chedi Triphop Tri Mongkhon', 'เจดีย์สแตนเลส (วัดสแตนเลส) ตั้งอยู่บนเขาคอหงส์ ภายในมีการจัดแสดงภาพวาดสามมิติและงานพุทธศิลป์', 'ถนนปุณณกัณฑ์ ตำบลคอหงส์ อำเภอ', '', 'เปิด 24 ชั่วโมง', '/jeady.jpg', 'ศาสนา');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `gender`, `phone`, `image_url`) VALUES
(1, 'Somchai', 'somchai@gmail.com', 'male', '0861111111', 'http://localhost:3001/uploads/1774162527613.webp'),
(2, 'Suda', 'suda@gmail.com', 'female', '0862222222', 'http://localhost:3001/uploads/1774162580518.jpg'),
(3, 'Anan', 'anan@gmail.com', 'male', '0863333333', 'http://localhost:3001/uploads/1774162599606.jpg'),
(4, 'Kanya', 'kanya@gmail.com', 'female', '0864444444', 'http://localhost:3001/uploads/1774162608615.jpg'),
(5, 'Prasert', 'prasert@gmail.com', 'male', '0865555555', 'http://localhost:3001/uploads/1774162621945.jpg'),
(6, 'Malee', 'malee@gmail.com', 'female', '0866666666', 'http://localhost:3001/uploads/1774162628012.jpg'),
(7, 'Narin', 'narin@gmail.com', 'male', '0867777777', 'http://localhost:3001/uploads/1774162636267.jpg'),
(8, 'Orn', 'orn@gmail.com', 'female', '0868888888', 'http://localhost:3001/uploads/1774162645670.jpeg'),
(9, 'Wichai', 'wichai@gmail.com', 'male', '0869999999', 'http://localhost:3001/uploads/1774162654003.jpg'),
(10, 'Pim', 'pim@gmail.com', 'female', '0870000000', 'http://localhost:3001/uploads/1774162663917.jpg'),
(11, 'yam', 'yam@email.com', 'female', '0875401690', 'http://localhost:3001/uploads/1774162687952.webp'),
(12, 'nusteekai', 'nnn648@gmail.com', 'female', '0987024598', 'http://localhost:3001/uploads/1774163037325.png'),
(13, 'nusraknat', '', 'female', '0000000000', 'http://localhost:3001/uploads/1774163104871.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `travel`
--
ALTER TABLE `travel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `travel`
--
ALTER TABLE `travel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;
