-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 28, 2024 at 06:24 AM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crudapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
CREATE TABLE IF NOT EXISTS `department` (
  `departmentId` int NOT NULL,
  `departmentName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`departmentId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`departmentId`, `departmentName`) VALUES
(1, 'Sales'),
(2, 'Marketing'),
(3, 'Human Resources'),
(4, 'Finance'),
(5, 'IT');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `hobbies` varchar(255) DEFAULT NULL,
  `departmentId` int DEFAULT NULL,
  `deletedAt` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `departmentId` (`departmentId`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `email`, `password`, `gender`, `hobbies`, `departmentId`, `deletedAt`) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', 'password1', 'Male', 'Reading, Swimming', 1, 1),
(2, 'Jane', 'Smith', 'jane.smith@example.com', 'password2', 'Female', 'Cooking, Hiking', 2, 0),
(3, 'Michael', 'Johnson', 'michael.johnson@example.com', 'password3', 'Male', 'Gaming, Traveling', 3, 0),
(4, 'Emily', 'Brown', 'emily.brown@example.com', 'password4', 'Female', 'Painting, Yoga', 4, 0),
(5, 'David', 'Martinez', 'david.martinez@example.com', 'password5', 'Male', 'Photography, Cycling', 5, 0),
(6, 'Sarah', 'Anderson', 'sarah.anderson@example.com', 'password6', 'Female', 'Dancing, Skiing', 1, 0),
(7, 'Chris', 'Wilson', 'chris.wilson@example.com', 'password7', 'Male', 'Playing guitar, Running', 2, 0),
(8, 'Jessica', 'Taylor', 'jessica.taylor@example.com', 'password8', 'Female', 'Watching movies, Cooking', 3, 0),
(9, 'Daniel', 'Thomas', 'daniel.thomas@example.com', 'password9', 'Male', 'Reading, Playing football', 4, 0),
(10, 'Amy', 'Roberts', 'amy.roberts@example.com', 'password10', 'Female', 'Writing, Shopping', 5, 0),
(11, 'John', 'Doe', 'nishar@gmail.com', '$2b$10$G4sXiuY2PjikLglgKHSYq.KeeyHOkIylmkZBGxu4KEWt.c3m6uxfi', 'Male', 'Reading, Swimming', 1, 0),
(12, 'Afroz', 'Alam', 'nisharalam@gmail.com', '$2b$10$7710wTFO9kj5l397kL9isOcYvSoLe/NWkPOR0rYmuVq6QGkVA1Lfi', 'Male', 'Reading, Swimming', 1, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
