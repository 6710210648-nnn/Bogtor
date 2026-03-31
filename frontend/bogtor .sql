-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 30, 2026 at 02:45 AM
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
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `author` varchar(100) DEFAULT 'ผู้ใช้นิรนาม',
  `image_url` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `content`, `author`, `image_url`, `created_at`) VALUES
(1, 'ตำในบ้าน', 'เป็ฯร้านที่ราคาถูกและให้เยอะมากๆ ปริมาณคุ้มราคา', 'นักชิมธีรเดช', 'http://localhost:3001/uploads/1774719870763.jpg', '2026-03-28 22:38:38'),
(3, 'Copper wood', 'คาเฟ่ฮีลใจที่เริ่ดด บรรยากาศอบอุ่น แบบมินิมอล ตกแต่งสีเอิร์ทโทน ตัดกับต้นสนใหญ่กลางร้าน มีทั้งโซนห้องแอร์เย็นฉ่ำ และโซน outdoor สบายๆ\nที่ตั้ง: 42 ตำบลบ้านพรุ อำเภอหาดใหญ่ สงขลา', 'Kate', 'http://localhost:3001/uploads/1774737834031.jpg', '2026-03-30 05:56:38'),
(4, 'ตลาดกิมหยง', 'ศูนย์รวมของฝากจากต่างประเทศ ผลไม้สด ผลไม้อบแห้ง และถั่วนานาชนิดที่เป็นเอกลักษณ์ของเมืองหาดใหญ่\nที่ตั้ง: ถนนศุภสารรังสรรค์ ตำบลหาดใหญ่ อำเภอหาดใหญ่ จังหวัดสงขลา', 'ผู้ใช้นิรนาม', 'http://localhost:3001/uploads/1774721214689.jpg', '2026-03-30 06:43:54'),
(5, 'สวนสาธารณะเทศบาลนครหาดใหญ่', 'แลนด์มาร์คสำคัญที่มีกระเช้าลอยฟ้า พระพุทธมงคลมหาราช และจุดชมวิวเมืองหาดใหญ่แบบ 360 องศา\nที่ตั้ง: ถนนกาญจนวนิช ตำบลคอหงส์ อำเภอหาดใหญ่ จังหวัดสงขลา', 'นักบินธีรเดช', 'http://localhost:3001/uploads/1774721221655.jpg', '2026-03-30 06:54:19'),
(6, 'ตลาดน้ำคลองแห', 'ตลาดน้ำแห่งแรกของภาคใต้ สัมผัสวิถีชีวิตชาวบ้าน ชิมอาหารท้องถิ่นที่ขายบนเรือพาย และใช้ภาชนะจากธรรมชาติ\nที่ตั้ง: ตำบลคลองแห อำเภอหาดใหญ่ จังหวัดสงขลา', 'นักกินไม่บอกชื่อหรอก', 'http://localhost:3001/uploads/1774721232944.jpg', '2026-03-30 06:55:15'),
(7, 'วัดหาดใหญ่ใน', 'ตลาดน้ำแห่งแรกของภาคใต้ สัมผัสวิถีชีวิตชาวบ้าน ชิมอาหารท้องถิ่นที่ขายบนเรือพาย และใช้ภาชนะจากธรรมชาติ\nที่ตั้ง: ถนนเพชรเกษม อำเภอหาดใหญ่ จังหวัดสงขลา', 'เเคทเทอรีน', 'http://localhost:3001/uploads/1774721248959.jpg', '2026-03-30 06:56:46'),
(8, 'น้ำตกโตนงาช้าง', 'น้ำตกที่มีชื่อเสียงระดับจังหวัด มีทั้งหมด 7 ชั้น โดยเฉพาะชั้นที่ 3 (งาช้าง) ที่มีความสวยงามเป็นพิเศษ\nที่ตั้ง: เขตรักษาพันธุ์สัตว์ป่าโตนงาช้าง อำเภอหาดใหญ่ จังหวัดสงขลา', 'คิทแคท', 'http://localhost:3001/uploads/1774721258132.jpg', '2026-03-30 06:58:02'),
(9, 'เซ็นทรัล หาดใหญ่', 'ห้างสรรพสินค้าที่ใหญ่และทันสมัยที่สุดในหาดใหญ่ ครบครันด้วยสินค้าและบริการ\nที่ตั้ง: ถนนกาญจนวณิช อำเภอหาดใหญ่ จังหวัดสงขลา', 'ธีรเดช', 'http://localhost:3001/uploads/1774721276194.jpg', '2026-03-30 06:58:50'),
(11, 'Sirene - Cafe & Restaurant', 'คาเฟ่ที่โดยรวมตกแต่งในสไตล์มินิมอล ซิกเนเจอร์ของทางร้านจะเป็นขนมแนวฝรั่งเศษ\nที่ตั้ง: 33 ราษฎร์ยินดี ซอย 3 ตำบล หาดใหญ่ อำเภอหาดใหญ่ สงขลา', 'นักชิมธีรเดช', 'http://localhost:3001/uploads/1774737849127.jpg', '2026-03-30 07:00:55'),
(12, 'วัดฉื่อฉาง', 'วัดจีนที่มีสถาปัตยกรรมโดดเด่น และเป็นศูนย์กลางการจัดงานเทศกาลสำคัญของชาวไทยเชื้อสายจีน\nที่ตั้ง: ถนนศุภสารรังสรรค์ อำเภอหาดใหญ่ จังหวัดสงขลา', 'เขต', 'http://localhost:3001/uploads/1774721313503.jpg', '2026-03-30 07:01:15'),
(13, 'on.cloud9.hdy', 'คาเฟ่มินิมอลเทสดี มุมถ่ายรูปจึ้ง แสงสวยแบบตะโกน\nที่ตั้ง: 1 เพชรเกษม ซอย 10/13 ตำบล หาดใหญ่ อำเภอหาดใหญ่ สงขลา', 'นักชิมธีรเดช', 'http://localhost:3001/uploads/1774737884561.jpg', '2026-03-30 07:03:16'),
(14, 'Keeyadee', 'คาเฟ่ที่มี Art gallery  บรรยายร่มรื่น มีโซน Outdoor / ห้องแอร์ / กลางคืน มี โซนดนตรีสด และสามารถ ร่วมกิจกรรม วาดรูปบนผ้าใบ\nที่ตั้ง: 51/1 ซอย 7 ตำบล หาดใหญ่ อำเภอหาดใหญ่ สงขลา', 'นักชิมธีรเดช', 'http://localhost:3001/uploads/1774737901905.jpg', '2026-03-30 07:03:58'),
(15, 'Cheevit Cheeva', 'เป็นคาเฟ่ขนมหวานชื่อดังจากเชียงใหม่ที่มาเปิดสาขาในหาดใหญ่ ตกแต่งสไตล์มินิมอล สว่าง โล่ง โปร่ง ให้บรรยากาศผ่อนคลาย\nที่ตั้ง: 43/22 ราษฎร์ยินดี ซอย 6/1 ตำบล หาดใหญ่ อำเภอหาดใหญ่ สงขลา', 'นักชิมสุดหล่อ', 'http://localhost:3001/uploads/1774737937099.jpg', '2026-03-30 07:05:18'),
(22, 'ตลาดกรีนเวย์ไนท์มาร์เก็ต', 'ตลาดนัดกลางคืนยอดนิยม แหล่งรวมเสื้อผ้าแฟชั่น สินค้ามือสอง และโซนอาหารที่หลากหลาย\nที่ตั้ง: ถนนกาญจนวณิชย์ อำเภอหาดใหญ่ จังหวัดสงขลา', 'ไมเคิ้ล', 'http://localhost:3001/uploads/1774721297184.jpg', '2026-03-30 07:18:28'),
(23, 'บัวลอยหลังวัง', 'ร้านบัวลอยสไตล์วินเทจ มีขนมหวานอื่น ๆ หลายเมนู\nที่ตั้ง: 544, 1 ถ.ธรรมนูญวิถี ตำบล หาดใหญ่ อำเภอหาดใหญ่ สงขลา', 'แจ็คแปปซี่', 'http://localhost:3001/uploads/1774737954253.webp', '2026-03-30 07:21:20'),
(24, 'พริกขี้หนู หมูกระทะ', 'ร้านกว้างขวาง นั่งสบาย ไม่แออัด พนักงานบริการดีมาก คอยสอดส่อง\nที่ตั้ง: 81/1 ถ.ไทยอาคาร', 'แยมมี่', 'http://localhost:3001/uploads/1774738012120.jpg', '2026-03-30 07:25:04'),
(25, 'เรือนเพชรหมูกระทะ', 'ร้านหมูกระทะที่อยู่คู่เมืองหาดใหญ่มาอย่างยาวนาน\nที่ตั้ง: ถ.ศรีภูวนาถ', 'เขต', 'http://localhost:3001/uploads/1774738024134.webp', '2026-03-30 07:25:26'),
(26, 'แคมป์ยาร์ด', 'ที่ตั้ง: 50/6 ถนน ศรีภูวนารถ ตำบล หาดใหญ่ อำเภอหาดใหญ่ สงขลา', 'นักชิมธีรเดช', 'http://localhost:3001/uploads/1774738061608.webp', '2026-03-30 07:26:01'),
(27, 'เจดีย์สเตนเลส', 'เจดีย์สวยงามโดดเด่น', 'นักชิมธีรเดช', '/jeady.jpg', '2026-03-30 07:28:55'),
(28, 'ข้าวยำปักษ์ใต้', 'ข้าวยำรสชาติเข้มข้น อร่อยแบบต้นตำรับ\nที่ตั้ง: สงขลา', 'นักชิมธีรเดช', '/ข้าวยำ.jpg', '2026-03-30 07:29:27'),
(29, 'หอยทอด', 'หอยทอดกรอบ ๆ ทานคู่กับน้ำจิ้มสูตรเด็ด \nที่ตั้ง: สงขลา', 'นักชิมธีรเดช', '/หอยทอด.jpg', '2026-03-30 07:30:01'),
(30, 'ไก่ทอดหาดใหญ่', 'หนังกรอบๆ เนื้อนุ่มหอมกลิ่นกระเทียม ต้องมาที่นี่เท่านั้น\nที่ตั้ง: สงขลา-หาดใหญ่', 'นักชิมธีรเดช', '/ไก่ทอดหาดใหญ่.jpg', '2026-03-30 07:30:25'),
(34, 'มัสยิดกลางประจำจังหวัดสงขลา', 'ศาสนสถานอันวิจิตรงดงาม เป็นศูนย์รวมจิตใจของชาวมุสลิมและเป็นจุดถ่ายภาพยอดนิยม\nที่ตั้ง: ตำบลคลองแห อำเภอหาดใหญ่ จังหวัดสงขลา', 'เนร่า', 'http://localhost:3001/uploads/1774721285071.jpg', '2026-03-30 07:37:18');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `author` varchar(100) DEFAULT 'ผู้ใช้นิรนาม',
  `text` text NOT NULL,
  `rating` int(11) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `article_id`, `author`, `text`, `rating`, `created_at`) VALUES
(1, 1, 'นุส', 'ไม่ร่อย', 4, '2026-03-28 22:40:06'),
(2, 1, 'ผู้ใช้นิรนาม', 'nggh', 0, '2026-03-29 00:44:49'),
(3, 1, 'jjj', 'jjj', 4, '2026-03-29 00:44:55'),
(4, 4, 'คุณเขต', 'ของเยอะดีนะ', 4, '2026-03-30 06:44:22'),
(5, 4, 'sun', 'คนเยอะมากก', 2, '2026-03-30 06:49:28'),
(6, 22, 'เขต', 'คนเยอะของกินเยอะ อร่อย เสื้อผ้าก้เยอะราคาดี', 0, '2026-03-30 07:26:48'),
(7, 22, 'เขตอีกคน', 'คนเยอะ ของเยอะ', 5, '2026-03-30 07:27:09');

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `id` int(100) NOT NULL,
  `name_th` varchar(255) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(255) NOT NULL,
  `opening_hours` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `map_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`id`, `name_th`, `name_en`, `type`, `description`, `location`, `opening_hours`, `image`, `map_url`) VALUES
(1, 'Copper wood', 'Copper wood', 'คาเฟ่', 'คาเฟ่ฮีลใจที่เริ่ดด บรรยากาศอบอุ่น แบบมินิมอล ตกแต่งสีเอิร์ทโทน ตัดกับต้นสนใหญ่กลางร้าน มีทั้งโซนห้องแอร์เย็นฉ่ำ และโซน outdoor สบายๆ', '42 ตำบลบ้านพรุ อำเภอหาดใหญ่ สงขลา ', '9:00 - 18:30', 'http://localhost:3001/uploads/1774737834031.jpg', ''),
(2, 'Sirene - Cafe & Restaurant', 'Sirene - Cafe & Restaurant', 'คาเฟ่', 'คาเฟ่ที่โดยรวมตกแต่งในสไตล์มินิมอล ซิกเนเจอร์ของทางร้านจะเป็นขนมแนวฝรั่งเศษ', '33 ราษฎร์ยินดี ซอย 3 ตำบล หาดใหญ่ อำเภอหาดใหญ่ สงขลา ', '9:00 - 20:00', 'http://localhost:3001/uploads/1774737849127.jpg', ''),
(3, 'on.cloud9.hdy', 'on.cloud9.hdy', 'คาเฟ่', 'คาเฟ่มินิมอลเทสดี มุมถ่ายรูปจึ้ง แสงสวยแบบตะโกน', '1 เพชรเกษม ซอย 10/13 ตำบล หาดใหญ่ อำเภอหาดใหญ่ สงขลา ', '7:00 - 19:00', 'http://localhost:3001/uploads/1774737884561.jpg', ''),
(4, 'Keeyadee', 'Keeyadee', 'คาเฟ่', 'คาเฟ่ที่มี Art gallery  บรรยายร่มรื่น มีโซน Outdoor / ห้องแอร์ / กลางคืน มี โซนดนตรีสด และสามารถ ร่วมกิจกรรม วาดรูปบนผ้าใบ', '51/1 ซอย 7 ตำบล หาดใหญ่ อำเภอหาดใหญ่ สงขลา', '7:30-18:00', 'http://localhost:3001/uploads/1774737901905.jpg', ''),
(5, 'Cheevit Cheeva', 'Cheevit Cheeva', 'ของหวาน', 'เป็นคาเฟ่ขนมหวานชื่อดังจากเชียงใหม่ที่มาเปิดสาขาในหาดใหญ่ ตกแต่งสไตล์มินิมอล สว่าง โล่ง โปร่ง ให้บรรยากาศผ่อนคลาย', '43/22 ราษฎร์ยินดี ซอย 6/1 ตำบล หาดใหญ่ อำเภอหาดใหญ่ สงขลา', '11:00-22:00', 'http://localhost:3001/uploads/1774737937099.jpg', ''),
(6, 'บัวลอยหลังวัง ', 'Bua Loy Lang Wang', 'ของหวาน', 'ร้านบัวลอยสไตล์วินเทจ มีขนมหวานอื่น ๆ หลายเมนู', '544, 1 ถ.ธรรมนูญวิถี ตำบล หาดใหญ่ อำเภอหาดใหญ่ สงขลา ', '16:00-22:00', 'http://localhost:3001/uploads/1774737954253.webp', ''),
(7, 'พริกขี้หนู หมูกระทะ', 'Chili peppers for Thai-style BBQ.', 'ปิ้งย่าง/ชาบู', 'ร้านกว้างขวาง นั่งสบาย ไม่แออัด พนักงานบริการดีมาก คอยสอดส่อง', '81/1 ถ.ไทยอาคาร', '16:00-22:00', 'http://localhost:3001/uploads/1774738012120.jpg', ''),
(8, 'เรือนเพชรหมูกระทะ', 'Ruen Phet Moo Krata', 'ปิ้งย่าง/ชาบู', 'ร้านหมูกระทะที่อยู่คู่เมืองหาดใหญ่มาอย่างยาวนาน', 'ถ.ศรีภูวนาถ', '16:00-22:00', 'http://localhost:3001/uploads/1774738024134.webp', ''),
(9, 'แคมป์ยาร์ด ', 'Camp Yard ', 'นั้งชิว', '', '50/6 ถนน ศรีภูวนารถ ตำบล หาดใหญ่ อำเภอหาดใหญ่ สงขลา', '12:00-22:00', 'http://localhost:3001/uploads/1774738061608.webp', ''),
(10, 'ช้อนทอง', 'Golden spoon', 'หมาล่า', ' สูตรหมาล่า ร้านดังจากหาดใหญ่ การันตีความอร่อยจาก', '4 ซอยเลี่ยม-เอียดอุทิศ ตำบล คอหงส์ อำเภอหาดใหญ่ สงขลา', '11:00-03:00', 'http://localhost:3001/uploads/1774738078171.jpg', ''),
(11, 'กรหมี่ไก่', 'Chicken noodles', 'ก๋วยเตี๋ยว', 'ร้านบะหมี่ท้องถิ่น เส้นบะหมี่นุ่ม ลวกเส้นสดใหม่ทุกชาม', 'ถ.ผดุงภัคดี ตำบล หาดใหญ่ อำเภอหาดใหญ่ สงขลา', '15:00-21:00', 'http://localhost:3001/uploads/1774738092304.webp', '');

-- --------------------------------------------------------

--
-- Table structure for table `travel`
--

CREATE TABLE `travel` (
  `id` int(11) NOT NULL,
  `title_th` varchar(255) DEFAULT NULL,
  `title_en` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `location_address` text DEFAULT NULL,
  `map_url` text DEFAULT NULL,
  `opening_hours` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(49) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `travel`
--

INSERT INTO `travel` (`id`, `title_th`, `title_en`, `description`, `location_address`, `map_url`, `opening_hours`, `image`, `category`) VALUES
(1, 'ตลาดกิมหยง', 'Kim Yong Market', 'ศูนย์รวมของฝากจากต่างประเทศ ผลไม้สด ผลไม้อบแห้ง และถั่วนานาชนิดที่เป็นเอกลักษณ์ของเมืองหาดใหญ่', 'ถนนศุภสารรังสรรค์ ตำบลหาดใหญ่ อำเภอหาดใหญ่ จังหวัดสงขลา', 'https://maps.app.goo.gl/p7xX6ubMwd9fBRWC9', '06:00 - 18:00 น.', 'http://localhost:3001/uploads/1774721214689.jpg', 'ตลาด/ช้อปปิ้ง'),
(2, 'สวนสาธารณะเทศบาลนครหาดใหญ่', 'Hat Yai Municipal Park', 'แลนด์มาร์คสำคัญที่มีกระเช้าลอยฟ้า พระพุทธมงคลมหาราช และจุดชมวิวเมืองหาดใหญ่แบบ 360 องศา', 'ถนนกาญจนวนิช ตำบลคอหงส์ อำเภอหาดใหญ่ จังหวัดสงขลา', 'https://maps.app.goo.gl/tyLJCs4knffs5FCh9', '05:00 - 20:00 น.', 'http://localhost:3001/uploads/1774721221655.jpg', 'ธรรมชาติ'),
(3, 'ตลาดน้ำคลองแห', 'Khlong Hae Floating Market', 'ตลาดน้ำแห่งแรกของภาคใต้ สัมผัสวิถีชีวิตชาวบ้าน ชิมอาหารท้องถิ่นที่ขายบนเรือพาย และใช้ภาชนะจากธรรมชาติ', 'ตำบลคลองแห อำเภอหาดใหญ่ จังหวัดสงขลา', 'https://maps.app.goo.gl/WjY1K2Fyh1AvVwFx6', '13:00 - 21:00 น', 'http://localhost:3001/uploads/1774721232944.jpg', 'ตลาด/ช้อปปิ้ง'),
(4, 'วัดหาดใหญ่ใน', 'Mahattamangkalaram', 'ตลาดน้ำแห่งแรกของภาคใต้ สัมผัสวิถีชีวิตชาวบ้าน ชิมอาหารท้องถิ่นที่ขายบนเรือพาย และใช้ภาชนะจากธรรมชาติ', 'ถนนเพชรเกษม อำเภอหาดใหญ่ จังหวัดสงขลา', 'https://maps.app.goo.gl/sa5zohW9ojCAkAS59', '07:00 - 18:00 น.', 'http://localhost:3001/uploads/1774721248959.jpg', 'ศาสนา'),
(5, 'น้ำตกโตนงาช้าง', 'Ton Nga Chang Waterfall', 'น้ำตกที่มีชื่อเสียงระดับจังหวัด มีทั้งหมด 7 ชั้น โดยเฉพาะชั้นที่ 3 (งาช้าง) ที่มีความสวยงามเป็นพิเศษ', 'เขตรักษาพันธุ์สัตว์ป่าโตนงาช้าง อำเภอหาดใหญ่ จังหวัดสงขลา', 'https://maps.app.goo.gl/u3mY2JMWfueNo6QZ6', '09:00 - 16:00 น.', 'http://localhost:3001/uploads/1774721258132.jpg', 'ธรรมชาติ'),
(6, 'เซ็นทรัล หาดใหญ่', 'Central Hatyai', 'ห้างสรรพสินค้าที่ใหญ่และทันสมัยที่สุดในหาดใหญ่ ครบครันด้วยสินค้าและบริการ', 'ถนนกาญจนวณิช อำเภอหาดใหญ่ จังหวัดสงขลา', 'https://maps.app.goo.gl/1kkxsBg7iBzawDGk9', '10:00 - 21:00 น.', 'http://localhost:3001/uploads/1774721276194.jpg', 'ตลาด/ช้อปปิ้ง'),
(7, 'มัสยิดกลางประจำจังหวัดสงขลา', 'Songkhla Central Mosque', 'ศาสนสถานอันวิจิตรงดงาม เป็นศูนย์รวมจิตใจของชาวมุสลิมและเป็นจุดถ่ายภาพยอดนิยม', 'ตำบลคลองแห อำเภอหาดใหญ่ จังหวัดสงขลา', 'https://maps.app.goo.gl/ycB3t7MJ8X3Y3feY8', '08:30 - 15:30 น.', 'http://localhost:3001/uploads/1774721285071.jpg', 'ศาสนา'),
(8, 'วัดฉื่อฉาง', 'Tse Chang Temple', 'วัดจีนที่มีสถาปัตยกรรมโดดเด่น และเป็นศูนย์กลางการจัดงานเทศกาลสำคัญของชาวไทยเชื้อสายจีน', 'ถนนศุภสารรังสรรค์ อำเภอหาดใหญ่ จังหวัดสงขลา', 'https://maps.app.goo.gl/NiwLJ6U1qmnssdjy9', '07:00 - 19:00 น.', 'http://localhost:3001/uploads/1774721313503.jpg', 'ศาสนา'),
(9, 'ตลาดกรีนเวย์ไนท์มาร์เก็ต', 'Greenway Night Market', 'ตลาดนัดกลางคืนยอดนิยม แหล่งรวมเสื้อผ้าแฟชั่น สินค้ามือสอง และโซนอาหารที่หลากหลาย', 'ถนนกาญจนวณิชย์ อำเภอหาดใหญ่ จังหวัดสงขลา', 'https://maps.app.goo.gl/1voTQX7QFmbrX9u77', '17:00 - 22:00 น.', 'http://localhost:3001/uploads/1774721297184.jpg', 'ตลาด/ช้อปปิ้ง'),
(10, 'พระมหาธาตุเจดีย์ไตรภพไตรมงคล', 'Maha That Chedi Triphop Tri Mongkhon', 'เจดีย์สแตนเลส (วัดสแตนเลส) ตั้งอยู่บนเขาคอหงส์ ภายในมีการจัดแสดงภาพวาดสามมิติและงานพุทธศิลป์', 'ถนนปุณณกัณฑ์ ตำบลคอหงส์ อำเภอ', 'https://maps.app.goo.gl/3pLENqyqmkWYF8ve6', 'เปิด 24 ชั่วโมง', 'http://localhost:3001/uploads/1774721305540.jpg', 'ศาสนา'),
(12, 'เมืองเก่าโปรตุเกส ', 'Sino-Portuguese Architecture', 'ย่านตึกเก่า อาคารชิโนโปรตุกีส หาดใหญ่ เป็นสถาปัตยกรรมที่ผสมผสานกันระหว่าง จีน และ โปรตุเกส พบทางตอนใต้ของแหลมมาลายู', '130 ถนน นิพัทธ์อุทิศ 1 ตำบล หาดใหญ่ อำเภอหาดใหญ่ ', 'https://maps.app.goo.gl/nbcm2HmWB1tfUDtb6', '24 ชม.', 'http://localhost:3001/uploads/1774721156993.jpg', 'เรียนรู้');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `gender`, `phone`, `image_url`) VALUES
(1, 'Somchai', 'somchai@gmail.com', NULL, 'male', '0861111111', 'http://localhost:3001/uploads/1774162527613.webp'),
(2, 'Suda', 'suda@gmail.com', NULL, 'female', '0862222222', 'http://localhost:3001/uploads/1774162580518.jpg'),
(3, 'Anan', 'anan@gmail.com', NULL, 'male', '0863333333', 'http://localhost:3001/uploads/1774162599606.jpg'),
(4, 'Kanya', 'kanya@gmail.com', NULL, 'female', '0864444444', 'http://localhost:3001/uploads/1774162608615.jpg'),
(5, 'Prasert', 'prasert@gmail.com', NULL, 'male', '0865555555', 'http://localhost:3001/uploads/1774162621945.jpg'),
(6, 'Malee', 'malee@gmail.com', NULL, 'female', '0866666666', 'http://localhost:3001/uploads/1774162628012.jpg'),
(7, 'Narin', 'narin@gmail.com', NULL, 'male', '0867777777', 'http://localhost:3001/uploads/1774162636267.jpg'),
(8, 'Orn', 'orn@gmail.com', NULL, 'female', '0868888888', 'http://localhost:3001/uploads/1774162645670.jpeg'),
(9, 'Wichai', 'wichai@gmail.com', NULL, 'male', '0869999999', 'http://localhost:3001/uploads/1774162654003.jpg'),
(10, 'Pim', 'pim@gmail.com', NULL, 'female', '0870000000', 'http://localhost:3001/uploads/1774162663917.jpg'),
(11, 'yam', 'yam@email.com', NULL, 'female', '0875401690', 'http://localhost:3001/uploads/1774162687952.webp'),
(12, 'nusteekai', 'nnn648@gmail.com', NULL, 'female', '0987024598', 'http://localhost:3001/uploads/1774163037325.png'),
(13, 'nusraknat', '', NULL, 'female', '0000000000', 'http://localhost:3001/uploads/1774163104871.jpg');

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
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `article_id` (`article_id`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `travel`
--
ALTER TABLE `travel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
