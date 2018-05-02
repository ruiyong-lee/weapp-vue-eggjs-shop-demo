/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50551
Source Host           : localhost:3306
Source Database       : wechat-shop-demo

Target Server Type    : MYSQL
Target Server Version : 50551
File Encoding         : 65001

Date: 2017-09-12 10:36:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for stockoutbill
-- ----------------------------
DROP TABLE IF EXISTS `stockoutbill`;
CREATE TABLE `stockoutbill` (
  `uuid` varchar(38) NOT NULL,
  `version` bigint(20) NOT NULL,
  `lastModifiedTime` datetime NOT NULL,
  `lastModifierName` varchar(76) NOT NULL,
  `lastModifierId` varchar(38) NOT NULL,
  `createdTime` datetime NOT NULL,
  `creatorName` varchar(76) NOT NULL,
  `creatorId` varchar(38) NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  `stockOutTotalQty` decimal(19,4) NOT NULL,
  `stockOutType` varchar(20) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `orgUuid` varchar(38) NOT NULL,
  `billNumber` varchar(38) NOT NULL,
  `sourceBillNumber` varchar(38) DEFAULT NULL,
  `warehouseUuid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;