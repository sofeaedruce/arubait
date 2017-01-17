-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.6.20-log - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for arubait
CREATE DATABASE IF NOT EXISTS `arubait` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `arubait`;

-- Dumping structure for table arubait.book
CREATE TABLE IF NOT EXISTS `book` (
  `book_status` varchar(10) DEFAULT '0' COMMENT 'NEW,APPLIED',
  `job_id` int(11) DEFAULT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  UNIQUE KEY `job_id_user_id` (`job_id`,`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table arubait.book: ~2 rows (approximately)
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` (`book_status`, `job_id`, `user_email`) VALUES
	('1', 6, 'syafiqahaqilahmh@gmail.com'),
	('1', 1, 'syafiqahaqilahmh@gmail.com');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;

-- Dumping structure for table arubait.follow
CREATE TABLE IF NOT EXISTS `follow` (
  `user_email` varchar(100) DEFAULT NULL,
  `follow_status` int(1) NOT NULL DEFAULT '0',
  `employer_email` varchar(100) DEFAULT NULL,
  UNIQUE KEY `user_email_employer_email` (`user_email`,`employer_email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table arubait.follow: ~3 rows (approximately)
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` (`user_email`, `follow_status`, `employer_email`) VALUES
	('sofea5488@gmail.com', 0, 'amirul.ghanie@gmail.com'),
	('syirah.suhaimi@gmail.com', 0, 'zulfikrizulkiflee@gmail.com'),
	('syafiqahaqilahmh@gmail.com', 1, 'zulfikrizulkiflee@gmail.com');
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;

-- Dumping structure for table arubait.job_applied
CREATE TABLE IF NOT EXISTS `job_applied` (
  `applied_id` int(11) NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`applied_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;

-- Dumping data for table arubait.job_applied: ~6 rows (approximately)
/*!40000 ALTER TABLE `job_applied` DISABLE KEYS */;
INSERT INTO `job_applied` (`applied_id`, `job_id`, `user_email`) VALUES
	(31, 1, 'sofea5488@gmail.com'),
	(32, 30, 'sofea5488@gmail.com'),
	(35, 30, 'syirah.suhaimi@gmail.com'),
	(36, 32, 'syirah.suhaimi@gmail.com'),
	(37, 6, 'syirah.suhaimi@gmail.com'),
	(40, 1, 'syafiqahaqilahmh@gmail.com');
/*!40000 ALTER TABLE `job_applied` ENABLE KEYS */;

-- Dumping structure for table arubait.job_category
CREATE TABLE IF NOT EXISTS `job_category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_desc` varchar(100) DEFAULT NULL,
  `category_picture` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table arubait.job_category: ~5 rows (approximately)
/*!40000 ALTER TABLE `job_category` DISABLE KEYS */;
INSERT INTO `job_category` (`category_id`, `category_desc`, `category_picture`) VALUES
	(1, 'Food & Beverage', 'http://www.langtonsmithhealth.com/wp-content/uploads/food-sugars.jpg'),
	(2, 'Cleaning', 'http://www.bondcleanaustralia.com.au/media/779607/Home-Cleaning-Gold-Coast.jpg'),
	(3, 'Laundry', 'https://s-media-cache-ak0.pinimg.com/736x/03/01/53/03015393688bb9681ca7c5abd071374a.jpg'),
	(4, 'Nursing', 'http://ncssu.com/wp-content/uploads/2016/02/nurse-preceptor-02.jpg'),
	(5, 'Tourism', 'https://s-media-cache-ak0.pinimg.com/736x/0a/d9/1c/0ad91c71604576cf1a101f9881bc6562.jpg');
/*!40000 ALTER TABLE `job_category` ENABLE KEYS */;

-- Dumping structure for table arubait.job_offered
CREATE TABLE IF NOT EXISTS `job_offered` (
  `job_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(100) NOT NULL,
  `category_id` varchar(50) NOT NULL DEFAULT '0',
  `job_desc` varchar(500) NOT NULL DEFAULT '0',
  `job_date_post` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `job_date_work` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `job_status` varchar(10) NOT NULL DEFAULT 'new' COMMENT 'NEW,APPLIED,ACCEPTED,REJECTED,COMPLETED,CANCELED',
  `job_poskod` int(11) NOT NULL DEFAULT '0',
  `job_address` varchar(500) NOT NULL DEFAULT '0',
  `job_salary` varchar(50) NOT NULL DEFAULT '0',
  `employer_rating` int(11) NOT NULL DEFAULT '0',
  `employer_review` varchar(500) NOT NULL DEFAULT '0',
  `employee_rating` int(11) NOT NULL DEFAULT '0',
  `employee_review` varchar(500) NOT NULL DEFAULT '0',
  `job_details` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;

-- Dumping data for table arubait.job_offered: ~10 rows (approximately)
/*!40000 ALTER TABLE `job_offered` DISABLE KEYS */;
INSERT INTO `job_offered` (`job_id`, `user_email`, `category_id`, `job_desc`, `job_date_post`, `job_date_work`, `job_status`, `job_poskod`, `job_address`, `job_salary`, `employer_rating`, `employer_review`, `employee_rating`, `employee_review`, `job_details`) VALUES
	(1, 'zulfikrizulkiflee@gmail.com', '1', 'Tukang Masak', '0000-00-00 00:00:00', '2017-10-10 02:10:10', 'new', 27000, 'Greenwood', '500', 3, 'good', 3, 'good', NULL),
	(2, 'sofea5488@gmail.com', '1', 'Tukang Buat Air', '0000-00-00 00:00:00', '2016-12-25 05:00:00', 'rejected', 27000, 'Kampung Inderapura', '100', 3, 'good', 3, 'good', NULL),
	(3, 'zulfikrizulkiflee@gmail.com', '2', 'Kemas Rumah', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'accepted', 27000, 'Taman Inderapura', '100', 3, 'good', 3, 'good', 'Seluruh kawasan rumah'),
	(6, 'zulfikrizulkiflee@gmail.com', '3', 'Gosok Baju', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'new', 0, 'Taman Pedah', '0', 0, '0', 0, '0', NULL),
	(30, 'amirul.ghanie@gmail.com', '4', 'Pengasuh Budak', '0000-00-00 00:00:00', '2017-01-28 00:00:00', 'applied', 0, 'Taman Scientex', '50', 0, '0', 0, '0', 'Jaga Budak iitu'),
	(31, 'amirul.ghanie@gmail.com', '5', 'Pemandu Pelancong', '0000-00-00 00:00:00', '2017-01-31 00:00:00', 'completed', 0, 'Taman Negara', '150', 0, '0', 0, '0', 'MEmandu Pelancong'),
	(32, 'sofea5488@gmail.com', '2', 'Cleaner', '0000-00-00 00:00:00', '2017-01-28 00:00:00', 'new', 0, 'Taman', '200', 0, '0', 0, '0', 'sasasas'),
	(51, 'sofea5488@gmail.com', '2', 'tebang pokok', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'new', 0, '', '', 0, '0', 0, '0', ''),
	(52, 'syafiqahaqilahmh@gmail.com', '4', 'penjaga kjucing', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'new', 0, '', '', 0, '0', 0, '0', ''),
	(53, 'syafiqahaqilahmh@gmail.com', '2', 'ryopp', '0000-00-00 00:00:00', '2017-01-25 00:00:00', 'new', 0, '', '', 0, '0', 0, '0', '');
/*!40000 ALTER TABLE `job_offered` ENABLE KEYS */;

-- Dumping structure for table arubait.job_picture
CREATE TABLE IF NOT EXISTS `job_picture` (
  `pic_id` int(11) NOT NULL AUTO_INCREMENT,
  `pic_url` varchar(100) DEFAULT NULL,
  `job_id` int(11) DEFAULT NULL,
  `pic2_url` varchar(100) DEFAULT NULL,
  `pic3_url` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`pic_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Dumping data for table arubait.job_picture: ~9 rows (approximately)
/*!40000 ALTER TABLE `job_picture` DISABLE KEYS */;
INSERT INTO `job_picture` (`pic_id`, `pic_url`, `job_id`, `pic2_url`, `pic3_url`) VALUES
	(1, 'https://d3tv8y14ogpztx.cloudfront.net/pulses/images/000/027/045/show_box/chef_demo-celeb_chef.jpg', 1, 'http://recipes.timesofindia.com/thumb/msid-50519739,width-400,resizemode-4/50519739.jpg', 'http://www.manchesterrestaurants.com/photos/indian/zouk-restaurant2.jpg'),
	(2, 'http://media.istockphoto.com/photos/woman-ironing-shirt-next-to-pile-of-laundry-picture-id175484884?', 6, NULL, NULL),
	(3, 'http://www.brightdayeveryday.net/clean.jpg', 3, NULL, NULL),
	(4, 'http://timesofindia.indiatimes.com/thumb/msid-47736051,width-400,resizemode-4/47736051.jpg', 5, NULL, NULL),
	(5, 'http://blog.chefsteps.com/wp-content/uploads/2012/12/ChefSteps-French-Press-Coffee-Grounds.jpg', 2, NULL, NULL),
	(6, 'http://3.bp.blogspot.com/-o_p43VuoTqg/Vdpz8vZXrCI/AAAAAAAAADQ/yRyrYKHc8Ec/s400/B8v8C1rCEAEBtL8.jpg', 4, NULL, NULL),
	(7, 'http://3.bp.blogspot.com/-o_p43VuoTqg/Vdpz8vZXrCI/AAAAAAAAADQ/yRyrYKHc8Ec/s400/B8v8C1rCEAEBtL8.jpg', 32, NULL, NULL),
	(8, 'http://3.bp.blogspot.com/-o_p43VuoTqg/Vdpz8vZXrCI/AAAAAAAAADQ/yRyrYKHc8Ec/s400/B8v8C1rCEAEBtL8.jpg', 31, NULL, NULL),
	(9, 'http://3.bp.blogspot.com/-o_p43VuoTqg/Vdpz8vZXrCI/AAAAAAAAADQ/yRyrYKHc8Ec/s400/B8v8C1rCEAEBtL8.jpg', 30, NULL, NULL);
/*!40000 ALTER TABLE `job_picture` ENABLE KEYS */;

-- Dumping structure for table arubait.notification
CREATE TABLE IF NOT EXISTS `notification` (
  `noti_id` int(11) NOT NULL AUTO_INCREMENT,
  `noti_desc` varchar(500) DEFAULT NULL,
  `noti_target` varchar(100) DEFAULT NULL COMMENT 'job_offered,job_applied',
  `user_email` varchar(100) DEFAULT NULL,
  `noti_status` varchar(10) DEFAULT 'UNREAD',
  PRIMARY KEY (`noti_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table arubait.notification: ~3 rows (approximately)
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` (`noti_id`, `noti_desc`, `noti_target`, `user_email`, `noti_status`) VALUES
	(1, 'Amirul has left a feedback on cuci', NULL, 'sofea5488@gmail.com', 'UNREAD'),
	(2, 'Kemas rumah has been applied', NULL, 'sofea5488@gmail.com', 'UNREAD'),
	(3, 'Aizal has left a feedback on potong rumput', NULL, 'sofea5488@gmail.com', 'READ');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;

-- Dumping structure for table arubait.user_profile
CREATE TABLE IF NOT EXISTS `user_profile` (
  `user_email` varchar(100) NOT NULL,
  `user_fullname` varchar(100) DEFAULT NULL,
  `user_poskod` int(10) DEFAULT NULL,
  `user_address` varchar(500) DEFAULT NULL,
  `user_pic` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table arubait.user_profile: ~5 rows (approximately)
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
INSERT INTO `user_profile` (`user_email`, `user_fullname`, `user_poskod`, `user_address`, `user_pic`) VALUES
	('amirul.ghanie@gmail.com', 'Iam Tsg', NULL, NULL, 'https://lh4.googleusercontent.com/-wp63Zlszl3o/AAAAAAAAAAI/AAAAAAAAAEo/0WURcu4USwg/s96-c/photo.jpg'),
	('sofea5488@gmail.com', 'Sharifah Edruce', NULL, NULL, 'https://lh5.googleusercontent.com/-N-gYJJIykLI/AAAAAAAAAAI/AAAAAAAAABI/SV6FD8KnnlY/s96-c/photo.jpg'),
	('syafiqahaqilahmh@gmail.com', 'Syafiqah Aqilah', NULL, NULL, 'https://lh3.googleusercontent.com/-0IkIxjy7yIY/AAAAAAAAAAI/AAAAAAAAAB0/pbsiKDpB45M/s96-c/photo.jpg'),
	('syirah.suhaimi@gmail.com', 'Syirah Suhaimi', NULL, NULL, 'https://lh5.googleusercontent.com/-yd5jMQMAAFY/AAAAAAAAAAI/AAAAAAAAACA/0tRnW68ICY8/s96-c/photo.jpg'),
	('zulfikrizulkiflee@gmail.com', 'Zulfikri Zulkiflee', NULL, NULL, 'http://lh4.googleusercontent.com/-osJvbCK1UJU/AAAAAAAAAAI/AAAAAAAAABA/YVSj4X64WAo/s96-c/photo.jpg');
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
