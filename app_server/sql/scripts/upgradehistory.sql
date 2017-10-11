/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50551
Source Host           : localhost:3306
Source Database       : wechat-shop-demo

Target Server Type    : MYSQL
Target Server Version : 50551
File Encoding         : 65001

Date: 2017-09-12 10:36:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for upgradehistory
-- ----------------------------
DROP TABLE IF EXISTS `upgradehistory`;
CREATE TABLE `upgradehistory` (
  `uuid` varchar(38) NOT NULL,
  `packageName` varchar(255) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;