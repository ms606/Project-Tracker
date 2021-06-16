-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2021 at 03:41 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `customer` varchar(200) DEFAULT NULL,
  `orderCode` varchar(100) DEFAULT NULL,
  `activity` varchar(500) DEFAULT NULL,
  `urgency` varchar(500) DEFAULT NULL,
  `machineDet` varchar(500) DEFAULT NULL,
  `expectedShipping` date DEFAULT NULL,
  `shipping` date DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `status_new` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `task_detail`
--

CREATE TABLE `task_detail` (
  `autoId` int(11) NOT NULL,
  `orderCode` varchar(10) NOT NULL,
  `department` varchar(3) DEFAULT NULL,
  `resource` varchar(1000) DEFAULT NULL,
  `duration` int(10) DEFAULT NULL,
  `hour` int(10) DEFAULT NULL,
  `NoOfResource` int(10) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `task_detail`
--

INSERT INTO `task_detail` (`autoId`, `orderCode`, `department`, `resource`, `duration`, `hour`, `NoOfResource`, `startDate`, `endDate`) VALUES
(69, 'VE2100121', 'V34', '4', 3, 43, 45, '2021-05-27', '30-May-2021'),
(70, 'VE2100121', 'wer', '123', 3, 4, 32, '2021-06-23', '26-Jun-2021');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `task_detail`
--
ALTER TABLE `task_detail`
  ADD UNIQUE KEY `id` (`autoId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task_detail`
--
ALTER TABLE `task_detail`
  MODIFY `autoId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
