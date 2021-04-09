-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 09, 2021 at 02:59 AM
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
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `adminID` int(20) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
(1, 0, 0, 'nice post - iris was here!');

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
(1, 1, ' love food', '0'),
(2, 1, 'this is a nice post', '1');

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
(0, 'GET', '/v1/post', 0),
(1, 'PUT', '/v1/post/like', 0),
(2, 'GET', '/v1/home', 0),
(3, 'POST', '/v1/home/submit', 0),
(4, 'DELETE', '/v1/home/delete', 0),
(5, 'POST', '/v1/home/like', 0),
(6, 'PUT', '/v1/home/like', 0),
(7, 'DELETE', '/v1/home/like', 0),
(8, 'POST', '/v1/post/submit', 0),
(9, 'GET', '/v1/post/comment', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(20) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `username`, `name`, `password`) VALUES
(0, 'irislawly', 'iris', 'pass'),
(1, 'tiffgu', 'tiff', 'pass123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`adminID`);

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
  MODIFY `commentID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `postID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
