/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50551
Source Host           : localhost:3306
Source Database       : wechat-shop-demo

Target Server Type    : MYSQL
Target Server Version : 50551
File Encoding         : 65001

Date: 2017-09-12 10:36:11
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for returnbillline
-- ----------------------------
DROP TABLE IF EXISTS `returnbillline`;
CREATE TABLE `returnbillline` (
  `uuid` varchar(38) NOT NULL,
  `goodsCategoryName` varchar(76) DEFAULT NULL,
  `goodsCategoryUuid` varchar(38) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `unitName` varchar(76) NOT NULL,
  `goodsSpec` varchar(255) DEFAULT NULL,
  `goodsName` varchar(76) NOT NULL,
  `goodsCode` varchar(38) NOT NULL,
  `goodsUuid` varchar(38) NOT NULL,
  `returnPrice` decimal(19,4) NOT NULL,
  `sourceBillLineUuid` varchar(38) DEFAULT NULL,
  `goodsPic` varchar(255) DEFAULT NULL,
  `returnQty` decimal(19,4) NOT NULL,
  `billUuid` varchar(38) NOT NULL,
  PRIMARY KEY (`uuid`),
  KEY `FKEE735DEBF88ABAA4` (`billUuid`),
  CONSTRAINT `FKEE735DEBF88ABAA4` FOREIGN KEY (`billUuid`) REFERENCES `returnbill` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
