/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50551
Source Host           : localhost:3306
Source Database       : wechat-shop-demo

Target Server Type    : MYSQL
Target Server Version : 50551
File Encoding         : 65001

Date: 2017-09-12 10:34:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `uuid` varchar(38) NOT NULL,
  `version` bigint(20) NOT NULL,
  `lastModifiedTime` datetime NOT NULL,
  `lastModifierName` varchar(76) NOT NULL,
  `lastModifierId` varchar(38) NOT NULL,
  `createdTime` datetime NOT NULL,
  `creatorName` varchar(76) NOT NULL,
  `creatorId` varchar(38) NOT NULL,
  `address` varchar(255) NOT NULL,
  `linkPhone` varchar(20) NOT NULL,
  `sysDefault` bit(1) DEFAULT NULL,
  `shopName` varchar(76) DEFAULT NULL,
  `linkMan` varchar(76) NOT NULL,
  `openId` varchar(38) DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;