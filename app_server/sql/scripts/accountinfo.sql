/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50551
Source Host           : localhost:3306
Source Database       : wechat-shop-demo

Target Server Type    : MYSQL
Target Server Version : 50551
File Encoding         : 65001

Date: 2017-09-12 10:34:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for accountinfo
-- ----------------------------
DROP TABLE IF EXISTS `accountinfo`;
CREATE TABLE `accountinfo` (
  `uuid` varchar(38) NOT NULL,
  `version` bigint(20) NOT NULL,
  `lastModifiedTime` datetime NOT NULL,
  `lastModifierName` varchar(76) NOT NULL,
  `lastModifierId` varchar(38) NOT NULL,
  `createdTime` datetime NOT NULL,
  `creatorName` varchar(76) NOT NULL,
  `creatorId` varchar(38) NOT NULL,
  `password` varchar(100) NOT NULL,
  `userName` varchar(12) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `userName` (`userName`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_AccountInfo_1` (`userName`,`password`),
  KEY `idx_AccountInfo_2` (`email`,`password`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of accountinfo
-- ----------------------------
INSERT INTO `accountinfo` VALUES ('4028c0155d73cb6b015d73cb7e2e0001', '0', '2017-07-24 16:51:42', 'system', 'system', '2017-07-24 16:51:42', 'system', 'system', '5CFD139A2DAE7364007E1E540929CB9D', 'superAdmin', null);
INSERT INTO `accountinfo` VALUES ('4028c0185de3e466015de3fba69a0001', '0', '2017-08-15 11:41:46', 'superAdmin', '4028c0155d73cb6b015d73cb7e3d0002', '2017-08-15 11:41:46', '超级管理员', '4028c0155d73cb6b015d73cb7e3d0002', 'C4CA4238A0B923820DCC509A6F75849B', '18359197148', null);
