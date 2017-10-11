/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50551
Source Host           : localhost:3306
Source Database       : wechat-shop-demo

Target Server Type    : MYSQL
Target Server Version : 50551
File Encoding         : 65001

Date: 2017-09-12 10:36:02
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for paymentrecord
-- ----------------------------
DROP TABLE IF EXISTS `paymentrecord`;
CREATE TABLE `paymentrecord` (
  `uuid` varchar(38) NOT NULL,
  `transactionId` varchar(38) DEFAULT NULL,
  `orderBillNumber` varchar(38) DEFAULT NULL,
  `appId` varchar(38) DEFAULT NULL,
  `mchId` varchar(38) DEFAULT NULL,
  `openId` varchar(38) DEFAULT NULL,
  `bankType` varchar(38) DEFAULT NULL,
  `payTime` datetime DEFAULT NULL,
  `totalFee` decimal(19,2) DEFAULT NULL,
  `cashFee` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
