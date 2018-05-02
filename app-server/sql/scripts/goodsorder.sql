/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50551
Source Host           : localhost:3306
Source Database       : wechat-shop-demo

Target Server Type    : MYSQL
Target Server Version : 50551
File Encoding         : 65001

Date: 2017-09-12 10:35:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goodsorder
-- ----------------------------
DROP TABLE IF EXISTS `goodsorder`;
CREATE TABLE `goodsorder` (
  `uuid` varchar(38) NOT NULL,
  `version` bigint(20) NOT NULL,
  `lastModifiedTime` datetime NOT NULL,
  `lastModifierName` varchar(76) NOT NULL,
  `lastModifierId` varchar(38) NOT NULL,
  `createdTime` datetime NOT NULL,
  `creatorName` varchar(76) NOT NULL,
  `creatorId` varchar(38) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `addressUuid` varchar(38) NOT NULL,
  `goodsTotalQty` decimal(19,4) NOT NULL,
  `deliveryTimeTypeSurcharge` decimal(19,4) DEFAULT NULL,
  `paymentAmount` decimal(19,4) DEFAULT NULL,
  `reductionAmount` decimal(19,4) DEFAULT NULL,
  `deliveryTimeTypeName` varchar(76) NOT NULL,
  `totalAmount` decimal(19,4) NOT NULL,
  `deliveryTimeTypeUuid` varchar(38) NOT NULL,
  `deliveryTimeTypeRemark` varchar(255) DEFAULT NULL,
  `freightAmount` decimal(19,4) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `linkPhone` varchar(20) NOT NULL,
  `orgUuid` varchar(38) NOT NULL,
  `shopName` varchar(76) DEFAULT NULL,
  `billNumber` varchar(38) NOT NULL,
  `linkMan` varchar(76) NOT NULL,
  `customerName` varchar(76) NOT NULL,
  `customerUuid` varchar(38) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;