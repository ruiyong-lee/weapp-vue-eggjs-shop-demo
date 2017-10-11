/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50551
Source Host           : localhost:3306
Source Database       : wechat-shop-demo

Target Server Type    : MYSQL
Target Server Version : 50551
File Encoding         : 65001

Date: 2017-09-12 10:35:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for log
-- ----------------------------
DROP TABLE IF EXISTS `log`;
CREATE TABLE `log` (
  `uuid` varchar(38) NOT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `module` varchar(255) DEFAULT NULL,
  `orgName` varchar(76) NOT NULL,
  `orgUuid` varchar(38) NOT NULL,
  `entityKey` varchar(255) DEFAULT NULL,
  `platform` varchar(20) NOT NULL,
  `operateTime` datetime DEFAULT NULL,
  `operatorName` varchar(76) DEFAULT NULL,
  `operatorUuid` varchar(38) DEFAULT NULL,
  `operateName` varchar(255) NOT NULL,
  PRIMARY KEY (`uuid`),
  KEY `idx_Log_1` (`orgUuid`,`entityKey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;