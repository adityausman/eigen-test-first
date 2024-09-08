-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 08, 2024 at 04:09 PM
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
-- Database: `db_book`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `book_code` varchar(10) NOT NULL,
  `title` varchar(150) DEFAULT NULL,
  `author` varchar(150) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`book_code`, `title`, `author`, `stock`) VALUES
('HOB-83', 'The Hobbit, or There and Back Again', '.R.R. Tolkien', 1),
('JK-45', 'Harry Potter', 'J.K Rowling', 1),
('NRN-7', 'The Lion, the Witch and the Wardrobe', 'C.S. Lewis', 1),
('SHR-1', 'A Study in Scarlet', 'Arthur Conan Doyle', 1),
('TW-11', 'Twilight', 'Stephenie Meyer', 1);

-- --------------------------------------------------------

--
-- Table structure for table `books_borrow`
--

CREATE TABLE `books_borrow` (
  `trans_id` varchar(15) NOT NULL,
  `trans_date` datetime NOT NULL,
  `member_code` varchar(10) NOT NULL,
  `is_return` tinyint(1) DEFAULT NULL,
  `penalty_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books_borrow`
--

INSERT INTO `books_borrow` (`trans_id`, `trans_date`, `member_code`, `is_return`, `penalty_date`) VALUES
('0191cd08-7ccd-7', '2024-08-31 17:00:00', 'M002', 1, '2024-09-10 22:09:55'),
('0191cd0e-0744-7', '2024-09-14 17:00:00', 'M002', 1, NULL),
('0191cd0f-9723-7', '2024-09-07 17:00:00', 'M002', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `books_borrow_detail`
--

CREATE TABLE `books_borrow_detail` (
  `trans_id` varchar(15) NOT NULL,
  `book_code` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books_borrow_detail`
--

INSERT INTO `books_borrow_detail` (`trans_id`, `book_code`) VALUES
('0191cd08-7ccd-7', 'NRN-7'),
('0191cd08-7ccd-7', 'SHR-1'),
('0191cd0e-0744-7', 'NRN-7'),
('0191cd0e-0744-7', 'SHR-1'),
('0191cd0f-9723-7', 'NRN-7'),
('0191cd0f-9723-7', 'SHR-1');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `member_code` varchar(10) NOT NULL,
  `name` char(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`member_code`, `name`) VALUES
('M001', 'Angga'),
('M002', 'Ferry'),
('M003', 'Putri');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`book_code`);

--
-- Indexes for table `books_borrow`
--
ALTER TABLE `books_borrow`
  ADD PRIMARY KEY (`trans_id`),
  ADD KEY `trans_date` (`trans_date`),
  ADD KEY `fk_relationship_3` (`member_code`);

--
-- Indexes for table `books_borrow_detail`
--
ALTER TABLE `books_borrow_detail`
  ADD PRIMARY KEY (`trans_id`,`book_code`),
  ADD KEY `IDX_1cbfb4d4fcfdd9feab2e350ff7` (`trans_id`),
  ADD KEY `IDX_78a0c0d16147cb51b121772693` (`book_code`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`member_code`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books_borrow`
--
ALTER TABLE `books_borrow`
  ADD CONSTRAINT `FK_c780517174032fc9f4c510ece8f` FOREIGN KEY (`member_code`) REFERENCES `members` (`member_code`) ON DELETE CASCADE;

--
-- Constraints for table `books_borrow_detail`
--
ALTER TABLE `books_borrow_detail`
  ADD CONSTRAINT `FK_1cbfb4d4fcfdd9feab2e350ff72` FOREIGN KEY (`trans_id`) REFERENCES `books_borrow` (`trans_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_78a0c0d16147cb51b1217726934` FOREIGN KEY (`book_code`) REFERENCES `books` (`book_code`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
