-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2021 at 12:32 PM
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
-- Database: `food_ordering`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer_phone_tb`
--

CREATE TABLE `customer_phone_tb` (
  `Contact_NumberID` int(11) NOT NULL,
  `Contact Number` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_tb`
--

CREATE TABLE `customer_tb` (
  `customerid` int(10) NOT NULL,
  `First_Name` varchar(500) NOT NULL,
  `Last_Name` varchar(500) NOT NULL,
  `Contact_NumberID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `feedback_tb`
--

CREATE TABLE `feedback_tb` (
  `CustomerID` int(10) NOT NULL,
  `CustomerReview` varchar(500) NOT NULL,
  `OrderID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_m_tb`
--

CREATE TABLE `order_m_tb` (
  `OrderID` int(10) NOT NULL,
  `CustomerID` int(10) NOT NULL,
  `PaymentID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_t_tb`
--

CREATE TABLE `order_t_tb` (
  `OrderID` int(10) NOT NULL,
  `ProductID` int(10) NOT NULL,
  `TotalQty` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `payment_tb`
--

CREATE TABLE `payment_tb` (
  `PaymentID` int(10) NOT NULL,
  `Payment Mode` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `products_tb`
--

CREATE TABLE `products_tb` (
  `ProductID` int(10) NOT NULL,
  `ProductName` varchar(500) NOT NULL,
  `ProductPrice` mediumint(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_vendor_tb`
--

CREATE TABLE `product_vendor_tb` (
  `ProductID` int(11) NOT NULL,
  `VendorID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `vendors_tb`
--

CREATE TABLE `vendors_tb` (
  `VendorID` int(10) NOT NULL,
  `VendorName` varchar(500) NOT NULL,
  `VendorAddress` varchar(500) NOT NULL,
  `VendorContactNumber` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_payment_tb`
--

CREATE TABLE `vendor_payment_tb` (
  `VendorID` int(10) NOT NULL,
  `PaymentID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer_phone_tb`
--
ALTER TABLE `customer_phone_tb`
  ADD PRIMARY KEY (`Contact_NumberID`);

--
-- Indexes for table `customer_tb`
--
ALTER TABLE `customer_tb`
  ADD PRIMARY KEY (`customerid`),
  ADD UNIQUE KEY `Contact_NumberID` (`Contact_NumberID`);

--
-- Indexes for table `feedback_tb`
--
ALTER TABLE `feedback_tb`
  ADD KEY `CustomerID` (`CustomerID`),
  ADD KEY `OrderID` (`OrderID`);

--
-- Indexes for table `order_m_tb`
--
ALTER TABLE `order_m_tb`
  ADD PRIMARY KEY (`OrderID`),
  ADD KEY `CustomerID` (`CustomerID`),
  ADD KEY `PaymentID` (`PaymentID`);

--
-- Indexes for table `order_t_tb`
--
ALTER TABLE `order_t_tb`
  ADD KEY `OrderID` (`OrderID`),
  ADD KEY `ProductID` (`ProductID`),
  ADD KEY `TotalQty` (`TotalQty`);

--
-- Indexes for table `payment_tb`
--
ALTER TABLE `payment_tb`
  ADD PRIMARY KEY (`PaymentID`);

--
-- Indexes for table `products_tb`
--
ALTER TABLE `products_tb`
  ADD PRIMARY KEY (`ProductID`);

--
-- Indexes for table `product_vendor_tb`
--
ALTER TABLE `product_vendor_tb`
  ADD UNIQUE KEY `ProductID` (`ProductID`),
  ADD UNIQUE KEY `VendorID` (`VendorID`);

--
-- Indexes for table `vendors_tb`
--
ALTER TABLE `vendors_tb`
  ADD PRIMARY KEY (`VendorID`);

--
-- Indexes for table `vendor_payment_tb`
--
ALTER TABLE `vendor_payment_tb`
  ADD UNIQUE KEY `VendorID` (`VendorID`,`PaymentID`),
  ADD KEY `PaymentID` (`PaymentID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customer_tb`
--
ALTER TABLE `customer_tb`
  ADD CONSTRAINT `customer_tb_ibfk_1` FOREIGN KEY (`Contact_NumberID`) REFERENCES `customer_phone_tb` (`Contact_NumberID`),
  ADD CONSTRAINT `customer_tb_ibfk_2` FOREIGN KEY (`customerid`) REFERENCES `feedback_tb` (`CustomerID`);

--
-- Constraints for table `feedback_tb`
--
ALTER TABLE `feedback_tb`
  ADD CONSTRAINT `feedback_tb_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `order_m_tb` (`OrderID`);

--
-- Constraints for table `order_m_tb`
--
ALTER TABLE `order_m_tb`
  ADD CONSTRAINT `order_m_tb_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customer_tb` (`customerid`);

--
-- Constraints for table `order_t_tb`
--
ALTER TABLE `order_t_tb`
  ADD CONSTRAINT `order_t_tb_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `order_m_tb` (`OrderID`),
  ADD CONSTRAINT `order_t_tb_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `products_tb` (`ProductID`);

--
-- Constraints for table `payment_tb`
--
ALTER TABLE `payment_tb`
  ADD CONSTRAINT `payment_tb_ibfk_1` FOREIGN KEY (`PaymentID`) REFERENCES `order_m_tb` (`PaymentID`);

--
-- Constraints for table `products_tb`
--
ALTER TABLE `products_tb`
  ADD CONSTRAINT `products_tb_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `product_vendor_tb` (`ProductID`);

--
-- Constraints for table `product_vendor_tb`
--
ALTER TABLE `product_vendor_tb`
  ADD CONSTRAINT `product_vendor_tb_ibfk_1` FOREIGN KEY (`VendorID`) REFERENCES `vendors_tb` (`VendorID`);

--
-- Constraints for table `vendors_tb`
--
ALTER TABLE `vendors_tb`
  ADD CONSTRAINT `vendors_tb_ibfk_1` FOREIGN KEY (`VendorID`) REFERENCES `vendor_payment_tb` (`VendorID`);

--
-- Constraints for table `vendor_payment_tb`
--
ALTER TABLE `vendor_payment_tb`
  ADD CONSTRAINT `vendor_payment_tb_ibfk_1` FOREIGN KEY (`PaymentID`) REFERENCES `payment_tb` (`PaymentID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
