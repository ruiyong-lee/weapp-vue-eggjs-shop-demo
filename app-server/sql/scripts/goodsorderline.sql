/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50551
Source Host           : localhost:3306
Source Database       : wechat-shop-demo

Target Server Type    : MYSQL
Target Server Version : 50551
File Encoding         : 65001

Date: 2017-09-12 10:35:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goodsorderline
-- ----------------------------
DROP TABLE IF EXISTS `goodsorderline`;
CREATE TABLE `goodsorderline` (
  `uuid` varchar(38) NOT NULL,
  `goodsCategoryName` varchar(76) DEFAULT NULL,
  `goodsCategoryUuid` varchar(38) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `unitName` varchar(76) NOT NULL,
  `salePrice` decimal(19,4) NOT NULL,
  `goodsSpec` varchar(255) DEFAULT NULL,
  `goodsName` varchar(76) NOT NULL,
  `goodsCode` varchar(38) NOT NULL,
  `goodsUuid` varchar(38) NOT NULL,
  `hasReturnQty` decimal(19,4) DEFAULT NULL,
  `goodsPic` varchar(255) DEFAULT NULL,
  `goodsQty` decimal(19,4) NOT NULL,
  `billUuid` varchar(38) NOT NULL,
  PRIMARY KEY (`uuid`),
  KEY `FKABC489CC3FB2891F` (`billUuid`),
  CONSTRAINT `FKABC489CC3FB2891F` FOREIGN KEY (`billUuid`) REFERENCES `goodsorder` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;