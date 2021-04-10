-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 10, 2021 at 07:40 PM
-- Server version: 10.3.28-MariaDB-log
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `irislawc_tiffiris_proj`
--

-- --------------------------------------------------------

--
-- Table structure for table `commentUserPost`
--

CREATE TABLE `commentUserPost` (
  `commentID` int(20) NOT NULL,
  `userID` int(20) NOT NULL,
  `postID` int(20) NOT NULL,
  `msg` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `commentUserPost`
--

INSERT INTO `commentUserPost` (`commentID`, `userID`, `postID`, `msg`) VALUES
(29, 8, 9, 'Vancouver has been sunny but really cold :o'),
(28, 2, 7, 'What changes are there? - user1'),
(31, 1, 7, 'Will be done in 3 hours');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `postID` int(20) NOT NULL,
  `userID` int(20) NOT NULL,
  `message` varchar(50) DEFAULT NULL,
  `likes` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`postID`, `userID`, `message`, `likes`) VALUES
(7, 1, 'Admin notice: update at 5 am PST!', '6'),
(9, 2, 'Weather is nice today - user1', '0'),
(10, 8, 'Hi! Just made account', '0');

-- --------------------------------------------------------

--
-- Table structure for table `stats`
--

CREATE TABLE `stats` (
  `statID` int(20) NOT NULL,
  `method` varchar(50) DEFAULT NULL,
  `endpoint` varchar(50) DEFAULT NULL,
  `requests` int(60) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stats`
--

INSERT INTO `stats` (`statID`, `method`, `endpoint`, `requests`) VALUES
(0, 'GET', '/v1/post', 1),
(1, 'PUT', '/v1/post/like', 0),
(2, 'DELETE', '/v1/post/comment', 0),
(3, 'POST', '/v1/post/submit', 0),
(4, 'POST', '/v1/post/comment', 1),
(5, 'GET', '/v1/home', 3),
(6, 'POST', '/v1/home/submit', 0),
(7, 'DELETE', '/v1/home/delete', 0),
(8, 'PUT', '/v1/home/like', 1),
(9, 'POST', '/v1/user', 0),
(10, 'POST', '/v1/user/new', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(20) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `username`, `password`, `admin`) VALUES
(1, 'admin', 'admin', 1),
(2, 'user1', 'user1', 0),
(7, 'user7', '123456', 0),
(6, 'test2', '1234', 0),
(8, 'irislawly', '123456', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `commentUserPost`
--
ALTER TABLE `commentUserPost`
  ADD PRIMARY KEY (`commentID`),
  ADD KEY `fk_userID` (`userID`),
  ADD KEY `fk_postID` (`postID`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`postID`),
  ADD KEY `fk_userID` (`userID`);

--
-- Indexes for table `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`statID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `commentUserPost`
--
ALTER TABLE `commentUserPost`
  MODIFY `commentID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `postID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
