-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 27, 2024 at 06:24 AM
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
  `departmentId` int NOT NULL AUTO_INCREMENT,
  `departmentName` varchar(50) NOT NULL,
  PRIMARY KEY (`departmentId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(10) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `hobbies` text NOT NULL,
  `departmentId` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;




CREATE TABLE Department (
    departmentId INT PRIMARY KEY,
    departmentName VARCHAR(255)
);

CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    gender VARCHAR(10),
    hobbies VARCHAR(255),
    departmentId INT,
    FOREIGN KEY (departmentId) REFERENCES Department(departmentId)
);

-- Insert dummy data into Department table
INSERT INTO Department (departmentId, departmentName) VALUES
(1, 'Sales'),
(2, 'Marketing'),
(3, 'Human Resources'),
(4, 'Finance'),
(5, 'IT');

-- Insert dummy data into User table
INSERT INTO User (firstName, lastName, email, password, gender, hobbies, departmentId) VALUES
('John', 'Doe', 'john.doe@example.com', 'password1', 'Male', 'Reading, Swimming', 1),
('Jane', 'Smith', 'jane.smith@example.com', 'password2', 'Female', 'Cooking, Hiking', 2),
('Michael', 'Johnson', 'michael.johnson@example.com', 'password3', 'Male', 'Gaming, Traveling', 3),
('Emily', 'Brown', 'emily.brown@example.com', 'password4', 'Female', 'Painting, Yoga', 4),
('David', 'Martinez', 'david.martinez@example.com', 'password5', 'Male', 'Photography, Cycling', 5),
('Sarah', 'Anderson', 'sarah.anderson@example.com', 'password6', 'Female', 'Dancing, Skiing', 1),
('Chris', 'Wilson', 'chris.wilson@example.com', 'password7', 'Male', 'Playing guitar, Running', 2),
('Jessica', 'Taylor', 'jessica.taylor@example.com', 'password8', 'Female', 'Watching movies, Cooking', 3),
('Daniel', 'Thomas', 'daniel.thomas@example.com', 'password9', 'Male', 'Reading, Playing football', 4),
('Amy', 'Roberts', 'amy.roberts@example.com', 'password10', 'Female', 'Writing, Shopping', 5);


SELECT User.id, User.firstName, User.lastName, User.email, User.password, User.gender, User.hobbies, Department.departmentId, Department.departmentName
FROM User
INNER JOIN Department ON User.departmentId = Department.departmentId;
