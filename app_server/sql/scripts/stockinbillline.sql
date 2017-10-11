/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50551
Source Host           : localhost:3306
Source Database       : wechat-shop-demo

Target Server Type    : MYSQL
Target Server Version : 50551
File Encoding         : 65001

Date: 2017-09-12 10:36:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for stockinbillline
-- ----------------------------
DROP TABLE IF EXISTS `stockinbillline`;
CREATE TABLE `stockinbillline` (
  `uuid` varchar(38) NOT NULL,
  `goodsCategoryName` varchar(76) DEFAULT NULL,
  `goodsCategoryUuid` varchar(38) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `unitName` varchar(76) NOT NULL,
  `goodsSpec` varchar(255) DEFAULT NULL,
  `goodsName` varchar(76) NOT NULL,
  `goodsCode` varchar(38) NOT NULL,
  `goodsUuid` varchar(38) NOT NULL,
  `stockInQty` decimal(19,4) NOT NULL,
  `billUuid` varchar(38) NOT NULL,
  `returnQty` decimal(19,4) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `FKED5FD89654582B3C` (`billUuid`),
  CONSTRAINT `FKED5FD89654582B3C` FOREIGN KEY (`billUuid`) REFERENCES `stockinbill` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;