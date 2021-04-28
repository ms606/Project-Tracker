-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2021 at 12:54 PM
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
  `id` int(10) NOT NULL,
  `task` varchar(200) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `orderCode` int(11) DEFAULT NULL,
  `title` varchar(500) DEFAULT NULL,
  `urgency` varchar(500) DEFAULT NULL,
  `machineDet` varchar(500) DEFAULT NULL,
  `expectedShipping` date DEFAULT NULL,
  `shipping` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `task`, `status`, `created_at`, `orderCode`, `title`, `urgency`, `machineDet`, `expectedShipping`, `shipping`) VALUES
(12222, 'lol', 1, '2021-04-27 13:46:33', NULL, 'lol', 'lol', 'lol', '2029-05-27', '2029-05-27'),
(12223, 'Poppi pon', 1, '2021-04-27 13:46:48', NULL, 'haha tus titttlees', 'high', 'fsdsdfgfsdgdf', '2021-05-27', '2022-05-27');

-- --------------------------------------------------------

--
-- Table structure for table `task_detail`
--

CREATE TABLE `task_detail` (
  `orderCode` int(10) NOT NULL,
  `department` varchar(3) NOT NULL,
  `resource` varchar(1000) NOT NULL,
  `duration` int(10) NOT NULL,
  `Hour` int(10) NOT NULL,
  `NoOfResource` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `task_detail`
--

INSERT INTO `task_detail` (`orderCode`, `department`, `resource`, `duration`, `Hour`, `NoOfResource`) VALUES
(1123, 'dda', 'sdfasfdafdaf', 23, 23, 43),
(1123, 'dda', 'sdfasfdafdaf', 23, 23, 43),
(123321, '12', 'lol', 12, 12, 0),
(2321, '12', 'kamehamehaa', 12, 12, 52),
(525221234, '12', 'Tajir', 12, 12, 52),
(99, '12', 'Tajir', 12, 12, 52);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12224;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
