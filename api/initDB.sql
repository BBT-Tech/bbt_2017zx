CREATE DATABASE autumn_recruit_2017 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE autumn_recruit_2017;

CREATE TABLE `register`(
  `ID` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  `gender` VARCHAR(5) NOT NULL,
  `college` VARCHAR(30) NOT NULL,
  `grade` VARCHAR(30) NOT NULL,
  `dorm` VARCHAR(10) NOT NULL,
  `tel` VARCHAR(11) NOT NULL,
  `department1` VARCHAR(30) NOT NULL,
  `department2` VARCHAR(30),
  `adjust` VARCHAR(5) NOT NULL,
  `intro` VARCHAR(200),
  `register_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(`ID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `departments`(
  `ID` INTEGER NOT NULL,
  `name` VARCHAR(30) NOT NULL,
  `img` VARCHAR(50) NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  PRIMARY KEY(`ID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `game`(
  `passed_number` INTEGER NOT NULL,
  `participate_number` INTEGER NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO `departments`
(`ID`, `name`, `img`, `description`)
VALUES
(0,'技术部','./pictures/0.png','我们部门只招妹子'),
(1,'策划推广部','./pictures/1.png','妹子请去技术部');

INSERT INTO `game`
(`passed_number`,`participate_number`)
VALUES
(0,0);
