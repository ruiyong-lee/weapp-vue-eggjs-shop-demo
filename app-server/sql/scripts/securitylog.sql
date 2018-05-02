/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50551
Source Host           : localhost:3306
Source Database       : wechat-shop-demo

Target Server Type    : MYSQL
Target Server Version : 50551
File Encoding         : 65001

Date: 2017-09-12 10:36:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for securitylog
-- ----------------------------
DROP TABLE IF EXISTS `securitylog`;
CREATE TABLE `securitylog` (
  `uuid` varchar(38) NOT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `userName` varchar(32) NOT NULL,
  `modifiedUserName` varchar(76) NOT NULL,
  `modifiedUserUuid` varchar(38) NOT NULL,
  `platform` varchar(255) NOT NULL,
  `ip` varchar(15) NOT NULL,
  `orgName` varchar(76) NOT NULL,
  `orgUuid` varchar(38) NOT NULL,
  `operateTime` datetime DEFAULT NULL,
  `operatorName` varchar(76) DEFAULT NULL,
  `operatorUuid` varchar(38) DEFAULT NULL,
  `userIdentity` varchar(20) NOT NULL,
  `operateName` varchar(255) NOT NULL,
  PRIMARY KEY (`uuid`),
  KEY `idx_SecurityLog_1` (`orgUuid`,`modifiedUserUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;