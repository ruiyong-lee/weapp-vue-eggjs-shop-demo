/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50551
Source Host           : localhost:3306
Source Database       : wechat-shop-demo

Target Server Type    : MYSQL
Target Server Version : 50551
File Encoding         : 65001

Date: 2017-09-12 10:34:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `uuid` varchar(38) NOT NULL,
  `version` bigint(20) NOT NULL,
  `lastModifiedTime` datetime NOT NULL,
  `lastModifierName` varchar(76) NOT NULL,
  `lastModifierId` varchar(38) NOT NULL,
  `createdTime` datetime NOT NULL,
  `creatorName` varchar(76) NOT NULL,
  `creatorId` varchar(38) NOT NULL,
  `name` varchar(76) NOT NULL,
  `sessionId` varchar(38) DEFAULT NULL,
  `disabledReason` varchar(255) DEFAULT NULL,
  `registerPlatform` varchar(20) DEFAULT NULL,
  `accountInfoUuid` varchar(38) DEFAULT NULL,
  `enableStatus` varchar(20) NOT NULL,
  `authenticateStatus` varchar(20) NOT NULL,
  `authenticateFailedReason` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `registerIP` varchar(15) DEFAULT NULL,
  `userType` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `accountInfoUuid` (`accountInfoUuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('4028c0155d73cb6b015d73cb7e3d0002', '0', '2017-07-24 16:51:42', 'system', 'system', '2017-07-24 16:51:42', 'system', 'system', 'superAdmin', null, null, 'service', '4028c0155d73cb6b015d73cb7e2e0001', 'enabled', 'authenticated', null, null, '0.0.0.0', 'superAdmin');
