/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50551
Source Host           : localhost:3306
Source Database       : wechat-shop-demo

Target Server Type    : MYSQL
Target Server Version : 50551
File Encoding         : 65001

Date: 2017-09-12 10:35:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `uuid` varchar(38) NOT NULL,
  `version` bigint(20) NOT NULL,
  `lastModifiedTime` datetime NOT NULL,
  `lastModifierName` varchar(76) NOT NULL,
  `lastModifierId` varchar(38) NOT NULL,
  `createdTime` datetime NOT NULL,
  `creatorName` varchar(76) NOT NULL,
  `creatorId` varchar(38) NOT NULL,
  `name` varchar(76) NOT NULL,
  `status` varchar(20) NOT NULL,
  `code` varchar(38) NOT NULL,
  `categoryUuid` varchar(38) DEFAULT NULL,
  `orgUuid` varchar(38) NOT NULL,
  `costPrice` decimal(19,4) DEFAULT NULL,
  `spec` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `goodsInfo` longtext,
  `unitName` varchar(76) NOT NULL,
  `salePrice` decimal(19,4) DEFAULT NULL,
  `atlasJsonStr` varchar(2000) DEFAULT NULL,
  `mainImg` varchar(255) DEFAULT NULL,
  `imagesJsonStr` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;