-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2021 at 11:28 AM
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
  `customer` varchar(200) NOT NULL,
  `orderCode` varchar(100) DEFAULT NULL,
  `activity` varchar(500) DEFAULT NULL,
  `urgency` varchar(500) DEFAULT NULL,
  `machineDet` varchar(500) DEFAULT NULL,
  `expectedShipping` date DEFAULT NULL,
  `shipping` date DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`customer`, `orderCode`, `activity`, `urgency`, `machineDet`, `expectedShipping`, `shipping`, `status`, `id`) VALUES
('lol', '5252', 'lol', 'lol', 'lol', '2029-05-27', '2029-05-27', NULL, 1),
('Poppi pon', NULL, 'haha tus titttlees', 'high', 'fsdsdfgfsdgdf', '2021-05-27', '2022-05-27', NULL, 2),
('Customer 3', 'VI2100103', 'Pianale esteso + modifica per robot raccogli staffe', 'High', 'Formula 14 ', '2029-05-26', NULL, 'COL', 3),
('Customer 3', 'VI2100113', 'Pianale esteso + modifica per robot raccogli staffe', 'High', 'Formula 14 ', '2029-05-26', NULL, 'COL', 4);

-- --------------------------------------------------------

--
-- Table structure for table `task_detail`
--

CREATE TABLE `task_detail` (
  `orderCode` varchar(10) NOT NULL,
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
('5252', 'dda', 'sdfasfdafdaf', 23, 23, 43),
('5252', 'dda', 'sdfasfdafdaf', 23, 23, 43),
('123321', '12', 'lol', 12, 12, 0),
('2321', '12', 'kamehamehaa', 12, 12, 52),
('99', '12', 'Tajir', 12, 12, 52),
('12233', 'Pia', 'Giovanni Giulianelli', 20, 14, 20),
('0', 'Pia', 'Giovanni Giulianelli', 20, 14, 20),
('VI2100103', 'Pia', 'Giovanni Giulianelli', 20, 14, 20);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
