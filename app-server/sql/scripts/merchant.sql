/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50551
Source Host           : localhost:3306
Source Database       : wechat-shop-demo

Target Server Type    : MYSQL
Target Server Version : 50551
File Encoding         : 65001

Date: 2017-09-12 10:35:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for merchant
-- ----------------------------
DROP TABLE IF EXISTS `merchant`;
CREATE TABLE `merchant` (
  `uuid` varchar(38) NOT NULL,
  `version` bigint(20) NOT NULL,
  `lastModifiedTime` datetime NOT NULL,
  `lastModifierName` varchar(76) NOT NULL,
  `lastModifierId` varchar(38) NOT NULL,
  `createdTime` datetime NOT NULL,
  `creatorName` varchar(76) NOT NULL,
  `creatorId` varchar(38) NOT NULL,
  `name` varchar(76) NOT NULL,
  `accountInfoUuid` varchar(38) DEFAULT NULL,
  `enableStatus` varchar(20) NOT NULL,
  `registerPlatform` varchar(20) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `registerIP` varchar(15) DEFAULT NULL,
  `sessionId` varchar(38) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `servicePhone` varchar(12) DEFAULT NULL,
  `orgName` varchar(76) DEFAULT NULL,
  `orgUuid` varchar(38) DEFAULT NULL,
  `userType` varchar(20) NOT NULL,
  `linkPhone` varchar(255) DEFAULT NULL,
  `linkMan` varchar(76) DEFAULT NULL,
  `appId` varchar(38) DEFAULT NULL,
  `mchKey` varchar(38) DEFAULT NULL,
  `mchId` varchar(38) DEFAULT NULL,
  `appSecret` varchar(38) DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;