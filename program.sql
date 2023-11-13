-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:3306
-- 產生時間： 2023 年 09 月 21 日 20:50
-- 伺服器版本： 10.3.38-MariaDB-0ubuntu0.20.04.1
-- PHP 版本： 7.4.3-4ubuntu2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `program`
--

-- --------------------------------------------------------

--
-- 資料表結構 `chatRoom`
--

CREATE TABLE `chatRoom` (
  `chatID` int(11) NOT NULL,
  `eID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `event`
--

CREATE TABLE `event` (
  `eID` int(11) NOT NULL,
  `uID` int(11) NOT NULL,
  `eventName` text NOT NULL,
  `eventBlockStartTime` int(11) NOT NULL,
  `eventBlockEndTime` int(11) NOT NULL,
  `eventFinalStartTime` int(11) NOT NULL,
  `eventFinalEndTime` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `matchTime` int(11) NOT NULL,
  `location` int(11) NOT NULL,
  `remindStatus` int(11) NOT NULL,
  `remindTime` int(11) NOT NULL,
  `remark` int(11) NOT NULL,
  `inviteLink` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `eventMembers`
--

CREATE TABLE `eventMembers` (
  `eID` int(11) NOT NULL,
  `uID` text NOT NULL,
  `stateOfParticipate` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `friend`
--

CREATE TABLE `friend` (
  `uID1` text NOT NULL,
  `uID2` text NOT NULL,
  `stateOfFriendship` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `journey`
--

CREATE TABLE `journey` (
  `jID` int(11) NOT NULL,
  `uID` text DEFAULT NULL,
  `journeyName` text NOT NULL,
  `journeyStartTime` int(11) NOT NULL,
  `journeyEndTime` int(11) NOT NULL,
  `isAllDay` int(11) DEFAULT NULL,
  `location` text DEFAULT NULL,
  `remindStatus` int(11) DEFAULT NULL,
  `remindTime` int(11) DEFAULT NULL,
  `remark` text DEFAULT NULL,
  `color` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `journey`
--

INSERT INTO `journey` (`jID`, `uID`, `journeyName`, `journeyStartTime`, `journeyEndTime`, `isAllDay`, `location`, `remindStatus`, `remindTime`, `remark`, `color`) VALUES
(2, '2222', '222', 1, 1, 1, '111', 1, 1, '1', '1'),
(5, '2233', '445', 0, 0, 123, '111', 1, 1, '1', '1'),
(6, '6233', '445', 0, 0, 123, '111', 1, 1, '1', '1'),
(7, '6233', '445', 0, 0, 123, '111', 1, 1, '1', '1'),
(8, '6233', '445', 0, 0, 123, '111', 1, 1, '1', '1'),
(9, '6233', '445', 0, 0, 123, '111', 1, 1, '1', '1'),
(10, '6233', '445', 0, 0, 123, '111', 1, 1, '1', '1'),
(11, '6233', '445', 0, 0, 123, '111', 1, 1, '1', '1'),
(12, '6233', '445', 0, 0, 123, '111', 1, 1, '1', '1'),
(13, '6233', '445', 0, 0, 123, '111', 1, 1, '1', '1'),
(14, '6233', '445', 0, 0, 123, '111', 1, 1, '1', '1'),
(15, '6233', '445', 0, 0, 123, '', 1, 1, '1', '1'),
(16, '', 'hh', 12, 12, 1, '', 1, 1, '', '1'),
(17, '', 'hh', 12, 12, 0, '', 1, 1, '', '1'),
(18, '1', 'hh', 12, 12, 0, '', 1, 1, '', '1'),
(19, '1', 'hh', 12, 12, 0, '', 1, 1, '', '1'),
(20, '1', 'hh', 12, 12, 0, '', 1, 1, '', '1'),
(21, '1', 'hh', 12, 12, 0, '', 1, 1, '', '1'),
(22, '1', 'hh', 12, 12, 0, '', 1, 1, '', '1'),
(23, '1', 'hh', 12, 12, 0, '', 1, 1, '', '1'),
(24, '2', 'hh', 12, 12, 0, '', 1, 1, '', '1'),
(25, '2', 'hh', 12, 12, 0, '', 1, 1, '', '1'),
(26, '2', 'hh', 12, 12, 0, '', 1, 1, '', '1'),
(27, '2', 'hh', 12, 12, 0, '', 1, 1, '', '1'),
(28, '2', 'hh', 12, 12, 0, '', 1, 1, '', '1');

-- --------------------------------------------------------

--
-- 資料表結構 `message`
--

CREATE TABLE `message` (
  `mID` int(11) NOT NULL,
  `chatID` int(11) NOT NULL,
  `meessageSendTIme` int(11) NOT NULL,
  `messageContent` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `reedMessage`
--

CREATE TABLE `reedMessage` (
  `mID` int(11) NOT NULL,
  `uID` int(11) NOT NULL,
  `readTime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `resultOfVote`
--

CREATE TABLE `resultOfVote` (
  `voteResultID` int(11) NOT NULL,
  `uID` text NOT NULL,
  `oID` int(11) NOT NULL,
  `votingTime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `uID` text NOT NULL,
  `account` text NOT NULL,
  `password` text NOT NULL,
  `userName` text NOT NULL,
  `googleAccount` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `user`
--

INSERT INTO `user` (`uID`, `account`, `password`, `userName`, `googleAccount`) VALUES
('123', 'ivy@gmail.com', 'ppp', 'Ivy', '...');

-- --------------------------------------------------------

--
-- 資料表結構 `vote`
--

CREATE TABLE `vote` (
  `vID` int(11) NOT NULL,
  `eID` int(11) NOT NULL,
  `uID` text NOT NULL,
  `voteName` text NOT NULL,
  `startTime` int(11) NOT NULL,
  `endTime` int(11) NOT NULL,
  `singleOrMultipleChoice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `votingOption`
--

CREATE TABLE `votingOption` (
  `oID` int(11) NOT NULL,
  `vID` int(11) NOT NULL,
  `votingOptionContent` text NOT NULL,
  `sortByVotingOptions` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `chatRoom`
--
ALTER TABLE `chatRoom`
  ADD PRIMARY KEY (`chatID`);

--
-- 資料表索引 `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`eID`);

--
-- 資料表索引 `journey`
--
ALTER TABLE `journey`
  ADD PRIMARY KEY (`jID`);

--
-- 資料表索引 `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`mID`);

--
-- 資料表索引 `resultOfVote`
--
ALTER TABLE `resultOfVote`
  ADD PRIMARY KEY (`voteResultID`);

--
-- 資料表索引 `vote`
--
ALTER TABLE `vote`
  ADD PRIMARY KEY (`vID`);

--
-- 資料表索引 `votingOption`
--
ALTER TABLE `votingOption`
  ADD PRIMARY KEY (`oID`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `chatRoom`
--
ALTER TABLE `chatRoom`
  MODIFY `chatID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `event`
--
ALTER TABLE `event`
  MODIFY `eID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `journey`
--
ALTER TABLE `journey`
  MODIFY `jID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `message`
--
ALTER TABLE `message`
  MODIFY `mID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `resultOfVote`
--
ALTER TABLE `resultOfVote`
  MODIFY `voteResultID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `vote`
--
ALTER TABLE `vote`
  MODIFY `vID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `votingOption`
--
ALTER TABLE `votingOption`
  MODIFY `oID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
