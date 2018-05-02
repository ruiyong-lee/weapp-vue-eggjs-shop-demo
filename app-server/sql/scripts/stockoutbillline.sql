/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50551
Source Host           : localhost:3306
Source Database       : wechat-shop-demo

Target Server Type    : MYSQL
Target Server Version : 50551
File Encoding         : 65001

Date: 2017-09-12 10:36:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for stockoutbillline
-- ----------------------------
DROP TABLE IF EXISTS `stockoutbillline`;
CREATE TABLE `stockoutbillline` (
  `uuid` varchar(38) NOT NULL,
  `stockOutQty` decimal(19,4) NOT NULL,
  `goodsCategoryName` varchar(76) DEFAULT NULL,
  `goodsCategoryUuid` varchar(38) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `unitName` varchar(76) NOT NULL,
  `goodsSpec` varchar(255) DEFAULT NULL,
  `goodsName` varchar(76) NOT NULL,
  `goodsCode` varchar(38) NOT NULL,
  `goodsUuid` varchar(38) NOT NULL,
  `billUuid` varchar(38) NOT NULL,
  `orderQty` decimal(19,4) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `FK6F0C5913DAE6AC90` (`billUuid`),
  CONSTRAINT `FK6F0C5913DAE6AC90` FOREIGN KEY (`billUuid`) REFERENCES `stockoutbill` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;