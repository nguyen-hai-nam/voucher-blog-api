-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: voucher-blog
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Business`
--

DROP TABLE IF EXISTS `Business`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Business` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar_image_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timetable_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lowest_price` int DEFAULT NULL,
  `highest_price` int DEFAULT NULL,
  `follow_count` int NOT NULL DEFAULT '0',
  `rating` double NOT NULL DEFAULT '0',
  `status` enum('ACTIVE','BLOCKED','DELETED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Business_address_id_key` (`address_id`),
  UNIQUE KEY `Business_timetable_id_key` (`timetable_id`),
  KEY `Business_category_id_fkey` (`category_id`),
  CONSTRAINT `Business_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `BusinessAddress` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Business_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `BusinessCategory` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Business_timetable_id_fkey` FOREIGN KEY (`timetable_id`) REFERENCES `BusinessTimetable` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Business`
--

LOCK TABLES `Business` WRITE;
/*!40000 ALTER TABLE `Business` DISABLE KEYS */;
INSERT INTO `Business` VALUES ('test-business-1','d73204a8-bb0e-4137-bc82-48e2d8e42f6d','Test Business 1','For testing purposes','https://loremflickr.com/cache/resized/483_19335249580_8962437bb6_c_480_480_nofilter.jpg','test_business_1@business.voucher.blog','0000000001','NULL','test-business-address-1','test-business-timetable-1',1000,100000,0,0,'ACTIVE','2023-10-05 06:35:01.947','2023-10-05 06:35:01.947'),('test-business-2','d73204a8-bb0e-4137-bc82-48e2d8e42f6d','Test Business 1','For testing purposes','https://loremflickr.com/cache/resized/483_19335249580_8962437bb6_c_480_480_nofilter.jpg','test_business_2@business.voucher.blog','0000000002','NULL','test-business-address-2','test-business-timetable-2',1000,100000,0,0,'ACTIVE','2023-10-05 06:35:01.947','2023-10-05 06:35:01.947'),('test-business-3','d73204a8-bb0e-4137-bc82-48e2d8e42f6d','Test Business 3','For testing purposes','https://loremflickr.com/cache/resized/483_19335249580_8962437bb6_c_480_480_nofilter.jpg','test_business_3@business.voucher.blog','0000000003','NULL','test-business-address-3','test-business-timetable-3',1000,100000,0,0,'ACTIVE','2023-10-05 06:35:01.947','2023-10-05 06:35:01.947');
/*!40000 ALTER TABLE `Business` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BusinessAddress`
--

DROP TABLE IF EXISTS `BusinessAddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BusinessAddress` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BusinessAddress`
--

LOCK TABLES `BusinessAddress` WRITE;
/*!40000 ALTER TABLE `BusinessAddress` DISABLE KEYS */;
INSERT INTO `BusinessAddress` VALUES ('test-business-address-1','Hanoi, Vietnam',1.01,1.01,'2023-10-05 06:34:34.927','2023-10-05 06:34:34.927'),('test-business-address-2','Hanoi, Vietnam',0.995,1,'2023-10-12 04:38:48.676','2023-10-12 04:38:48.676'),('test-business-address-3','Hanoi, Vietnam',0.99,1.002,'2023-10-12 04:38:48.696','2023-10-12 04:38:48.696');
/*!40000 ALTER TABLE `BusinessAddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BusinessCategory`
--

DROP TABLE IF EXISTS `BusinessCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BusinessCategory` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BusinessCategory`
--

LOCK TABLES `BusinessCategory` WRITE;
/*!40000 ALTER TABLE `BusinessCategory` DISABLE KEYS */;
INSERT INTO `BusinessCategory` VALUES ('9acbf91c-7b92-4a82-be50-7641ed3dcae4','Tea'),('d73204a8-bb0e-4137-bc82-48e2d8e42f6d','Other'),('efeee101-b2c1-41e3-9285-511edae63384','Coffee');
/*!40000 ALTER TABLE `BusinessCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BusinessCustomer`
--

DROP TABLE IF EXISTS `BusinessCustomer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BusinessCustomer` (
  `business_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `take_voucher_count` int NOT NULL,
  `use_voucher_count` int NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`business_id`,`user_id`),
  KEY `BusinessCustomer_user_id_fkey` (`user_id`),
  CONSTRAINT `BusinessCustomer_business_id_fkey` FOREIGN KEY (`business_id`) REFERENCES `Business` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `BusinessCustomer_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BusinessCustomer`
--

LOCK TABLES `BusinessCustomer` WRITE;
/*!40000 ALTER TABLE `BusinessCustomer` DISABLE KEYS */;
/*!40000 ALTER TABLE `BusinessCustomer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BusinessFollower`
--

DROP TABLE IF EXISTS `BusinessFollower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BusinessFollower` (
  `business_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`business_id`,`user_id`),
  KEY `BusinessFollower_user_id_fkey` (`user_id`),
  CONSTRAINT `BusinessFollower_business_id_fkey` FOREIGN KEY (`business_id`) REFERENCES `Business` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `BusinessFollower_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BusinessFollower`
--

LOCK TABLES `BusinessFollower` WRITE;
/*!40000 ALTER TABLE `BusinessFollower` DISABLE KEYS */;
/*!40000 ALTER TABLE `BusinessFollower` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BusinessManager`
--

DROP TABLE IF EXISTS `BusinessManager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BusinessManager` (
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `business_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`business_id`,`user_id`),
  KEY `BusinessManager_user_id_fkey` (`user_id`),
  CONSTRAINT `BusinessManager_business_id_fkey` FOREIGN KEY (`business_id`) REFERENCES `Business` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `BusinessManager_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BusinessManager`
--

LOCK TABLES `BusinessManager` WRITE;
/*!40000 ALTER TABLE `BusinessManager` DISABLE KEYS */;
INSERT INTO `BusinessManager` VALUES ('test-user-1','test-business-1','2023-10-12 04:44:58.148','2023-10-12 04:44:58.148'),('test-user-2','test-business-2','2023-10-12 04:44:58.148','2023-10-12 04:44:58.148'),('test-user-2','test-business-3','2023-10-12 04:44:58.148','2023-10-12 04:44:58.148'),('test-user-3','test-business-3','2023-10-12 04:44:58.148','2023-10-12 04:44:58.148');
/*!40000 ALTER TABLE `BusinessManager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BusinessRating`
--

DROP TABLE IF EXISTS `BusinessRating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BusinessRating` (
  `business_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` int NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`business_id`,`user_id`),
  KEY `BusinessRating_user_id_fkey` (`user_id`),
  CONSTRAINT `BusinessRating_business_id_fkey` FOREIGN KEY (`business_id`) REFERENCES `Business` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `BusinessRating_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BusinessRating`
--

LOCK TABLES `BusinessRating` WRITE;
/*!40000 ALTER TABLE `BusinessRating` DISABLE KEYS */;
/*!40000 ALTER TABLE `BusinessRating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BusinessTimetable`
--

DROP TABLE IF EXISTS `BusinessTimetable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BusinessTimetable` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mon_opens_at` time DEFAULT NULL,
  `mon_closes_at` time DEFAULT NULL,
  `tue_opens_at` time DEFAULT NULL,
  `tue_closes_at` time DEFAULT NULL,
  `wed_opens_at` time DEFAULT NULL,
  `wed_closes_at` time DEFAULT NULL,
  `thu_opens_at` time DEFAULT NULL,
  `thu_closes_at` time DEFAULT NULL,
  `fri_opens_at` time DEFAULT NULL,
  `fri_closes_at` time DEFAULT NULL,
  `sat_opens_at` time DEFAULT NULL,
  `sat_closes_at` time DEFAULT NULL,
  `sun_opens_at` time DEFAULT NULL,
  `sun_closes_at` time DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BusinessTimetable`
--

LOCK TABLES `BusinessTimetable` WRITE;
/*!40000 ALTER TABLE `BusinessTimetable` DISABLE KEYS */;
INSERT INTO `BusinessTimetable` VALUES ('test-business-timetable-1','09:00:00','20:00:00','09:00:00','20:00:00','09:00:00','20:00:00','09:00:00','20:00:00','09:00:00','20:00:00','09:00:00','20:00:00','09:00:00','20:00:00','2023-10-02 06:17:22.823','2023-10-02 06:17:22.823'),('test-business-timetable-2','09:00:00','20:00:00','09:00:00','20:00:00','09:00:00','20:00:00','09:00:00','20:00:00','09:00:00','20:00:00','09:00:00','20:00:00','09:00:00','20:00:00','2023-10-02 06:17:22.823','2023-10-02 06:17:22.823'),('test-business-timetable-3','09:00:00','20:00:00','09:00:00','20:00:00','09:00:00','20:00:00','09:00:00','20:00:00','09:00:00','20:00:00','09:00:00','20:00:00','09:00:00','20:00:00','2023-10-02 06:17:22.823','2023-10-02 06:17:22.823');
/*!40000 ALTER TABLE `BusinessTimetable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post`
--

DROP TABLE IF EXISTS `Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Post` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `business_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Post_business_id_fkey` (`business_id`),
  CONSTRAINT `Post_business_id_fkey` FOREIGN KEY (`business_id`) REFERENCES `Business` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post`
--

LOCK TABLES `Post` WRITE;
/*!40000 ALTER TABLE `Post` DISABLE KEYS */;
INSERT INTO `Post` VALUES ('test-post-1','test-business-1','For test','2023-10-05 06:35:35.010','2023-10-05 06:35:35.010'),('test-post-2','test-business-2','For test','2023-10-05 06:35:35.010','2023-10-05 06:35:35.010'),('test-post-3','test-business-3','For test','2023-10-05 06:35:35.010','2023-10-05 06:35:35.010');
/*!40000 ALTER TABLE `Post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PostComment`
--

DROP TABLE IF EXISTS `PostComment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PostComment` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `PostComment_user_id_fkey` (`user_id`),
  KEY `PostComment_post_id_fkey` (`post_id`),
  CONSTRAINT `PostComment_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `PostComment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PostComment`
--

LOCK TABLES `PostComment` WRITE;
/*!40000 ALTER TABLE `PostComment` DISABLE KEYS */;
/*!40000 ALTER TABLE `PostComment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PostFavorite`
--

DROP TABLE IF EXISTS `PostFavorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PostFavorite` (
  `post_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`post_id`,`user_id`),
  KEY `PostFavorite_user_id_fkey` (`user_id`),
  CONSTRAINT `PostFavorite_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `PostFavorite_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PostFavorite`
--

LOCK TABLES `PostFavorite` WRITE;
/*!40000 ALTER TABLE `PostFavorite` DISABLE KEYS */;
/*!40000 ALTER TABLE `PostFavorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PostSave`
--

DROP TABLE IF EXISTS `PostSave`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PostSave` (
  `post_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`post_id`,`user_id`),
  KEY `PostSave_user_id_fkey` (`user_id`),
  CONSTRAINT `PostSave_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `PostSave_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PostSave`
--

LOCK TABLES `PostSave` WRITE;
/*!40000 ALTER TABLE `PostSave` DISABLE KEYS */;
/*!40000 ALTER TABLE `PostSave` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PostVoucher`
--

DROP TABLE IF EXISTS `PostVoucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PostVoucher` (
  `post_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `voucher_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `index` int NOT NULL,
  PRIMARY KEY (`post_id`,`voucher_id`),
  KEY `PostVoucher_voucher_id_fkey` (`voucher_id`),
  CONSTRAINT `PostVoucher_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `PostVoucher_voucher_id_fkey` FOREIGN KEY (`voucher_id`) REFERENCES `Voucher` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PostVoucher`
--

LOCK TABLES `PostVoucher` WRITE;
/*!40000 ALTER TABLE `PostVoucher` DISABLE KEYS */;
INSERT INTO `PostVoucher` VALUES ('test-post-1','test-voucher-1',0),('test-post-1','test-voucher-2',1),('test-post-1','test-voucher-3',2),('test-post-2','test-voucher-4',0),('test-post-2','test-voucher-5',1),('test-post-2','test-voucher-6',2),('test-post-3','test-voucher-7',0),('test-post-3','test-voucher-8',1),('test-post-3','test-voucher-9',2);
/*!40000 ALTER TABLE `PostVoucher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `business_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `status` enum('AVAILABLE','SOLD_OUT','DELETED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'AVAILABLE',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Product_business_id_fkey` (`business_id`),
  CONSTRAINT `Product_business_id_fkey` FOREIGN KEY (`business_id`) REFERENCES `Business` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES ('test-product-1','test-business-1','Test Product 1','https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg','For test',50000,'AVAILABLE','2023-10-02 06:19:24.881','2023-10-02 06:19:24.881'),('test-product-2','test-business-1','Test Product 2','https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg','For test',50000,'AVAILABLE','2023-10-02 06:19:24.881','2023-10-02 06:19:24.881'),('test-product-3','test-business-1','Test Product 3','https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg','For test',50000,'AVAILABLE','2023-10-02 06:19:24.881','2023-10-02 06:19:24.881'),('test-product-4','test-business-2','Test Product 4','https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg','For test',50000,'AVAILABLE','2023-10-02 06:19:24.881','2023-10-02 06:19:24.881'),('test-product-5','test-business-2','Test Product 5','https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg','For test',50000,'AVAILABLE','2023-10-02 06:19:24.881','2023-10-02 06:19:24.881'),('test-product-6','test-business-2','Test Product 6','https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg','For test',50000,'AVAILABLE','2023-10-02 06:19:24.881','2023-10-02 06:19:24.881'),('test-product-7','test-business-3','Test Product 7','https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg','For test',50000,'AVAILABLE','2023-10-02 06:19:24.881','2023-10-02 06:19:24.881'),('test-product-8','test-business-3','Test Product 8','https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg','For test',50000,'AVAILABLE','2023-10-02 06:19:24.881','2023-10-02 06:19:24.881'),('test-product-9','test-business-3','Test Product 9','https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg','For test',50000,'AVAILABLE','2023-10-02 06:19:24.881','2023-10-02 06:19:24.881');
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar_image_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('ACTIVE','BLOCKED','DELETED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('admin-1','$2b$10$aCnscXyZVttZHULKy7r8ruGrGFofAsB8geFP4gYNdXchfmOz4g8VC','Nguyen Hai Nam',NULL,'ACTIVE','2023-09-27 17:57:06.192','2023-09-27 17:57:06.192',1),('test-user-1','$2b$10$aCnscXyZVttZHULKy7r8ruGrGFofAsB8geFP4gYNdXchfmOz4g8VC','Test User 1',NULL,'ACTIVE','2023-10-12 04:43:09.836','2023-10-12 04:43:09.836',0),('test-user-10','$2b$10$aCnscXyZVttZHULKy7r8ruGrGFofAsB8geFP4gYNdXchfmOz4g8VC','Test User 10',NULL,'ACTIVE','2023-10-12 04:43:09.836','2023-10-12 04:43:09.836',0),('test-user-2','$2b$10$aCnscXyZVttZHULKy7r8ruGrGFofAsB8geFP4gYNdXchfmOz4g8VC','Test User 2',NULL,'ACTIVE','2023-10-12 04:43:09.836','2023-10-12 04:43:09.836',0),('test-user-3','$2b$10$aCnscXyZVttZHULKy7r8ruGrGFofAsB8geFP4gYNdXchfmOz4g8VC','Test User 3',NULL,'ACTIVE','2023-10-12 04:43:09.836','2023-10-12 04:43:09.836',0),('test-user-4','$2b$10$aCnscXyZVttZHULKy7r8ruGrGFofAsB8geFP4gYNdXchfmOz4g8VC','Test User 4',NULL,'ACTIVE','2023-10-12 04:43:09.836','2023-10-12 04:43:09.836',0),('test-user-5','$2b$10$aCnscXyZVttZHULKy7r8ruGrGFofAsB8geFP4gYNdXchfmOz4g8VC','Test User 5',NULL,'ACTIVE','2023-10-12 04:43:09.836','2023-10-12 04:43:09.836',0),('test-user-6','$2b$10$aCnscXyZVttZHULKy7r8ruGrGFofAsB8geFP4gYNdXchfmOz4g8VC','Test User 6',NULL,'ACTIVE','2023-10-12 04:43:09.836','2023-10-12 04:43:09.836',0),('test-user-7','$2b$10$aCnscXyZVttZHULKy7r8ruGrGFofAsB8geFP4gYNdXchfmOz4g8VC','Test User 7',NULL,'ACTIVE','2023-10-12 04:43:09.836','2023-10-12 04:43:09.836',0),('test-user-8','$2b$10$aCnscXyZVttZHULKy7r8ruGrGFofAsB8geFP4gYNdXchfmOz4g8VC','Test User 8',NULL,'ACTIVE','2023-10-12 04:43:09.836','2023-10-12 04:43:09.836',0),('test-user-9','$2b$10$aCnscXyZVttZHULKy7r8ruGrGFofAsB8geFP4gYNdXchfmOz4g8VC','Test User 9',NULL,'ACTIVE','2023-10-12 04:43:09.836','2023-10-12 04:43:09.836',0);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserAddress`
--

DROP TABLE IF EXISTS `UserAddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserAddress` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('HOME','OFFICE') COLLATE utf8mb4_unicode_ci NOT NULL,
  `lng` double NOT NULL,
  `lat` double NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `UserAddress_user_id_fkey` (`user_id`),
  CONSTRAINT `UserAddress_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserAddress`
--

LOCK TABLES `UserAddress` WRITE;
/*!40000 ALTER TABLE `UserAddress` DISABLE KEYS */;
INSERT INTO `UserAddress` VALUES ('1ca16e4a-eec4-4347-8c76-bb52f16e7cb2','admin-1','Dai Co Viet, Hai Ba Trung, Ha Noi','OFFICE',100.01,100.01,'2023-09-28 09:26:35.378','2023-09-28 09:26:35.378'),('72e6281c-ab11-4983-b119-e0d2e6ae606a','admin-1','Dong Anh, Ha Noi','HOME',100.01,100.01,'2023-09-28 09:30:40.445','2023-09-28 09:30:40.445');
/*!40000 ALTER TABLE `UserAddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserEmail`
--

DROP TABLE IF EXISTS `UserEmail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserEmail` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserEmail_user_id_key` (`user_id`),
  CONSTRAINT `UserEmail_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserEmail`
--

LOCK TABLES `UserEmail` WRITE;
/*!40000 ALTER TABLE `UserEmail` DISABLE KEYS */;
INSERT INTO `UserEmail` VALUES ('admin@voucher.blog','admin-1','2023-09-27 17:57:06.361','2023-09-27 17:57:06.361'),('test_1@voucher.blog','test-user-1','2023-10-12 04:59:08.106','2023-10-12 04:59:08.106'),('test_10@voucher.blog','test-user-10','2023-10-12 04:59:08.106','2023-10-12 04:59:08.106'),('test_2@voucher.blog','test-user-2','2023-10-12 04:59:08.106','2023-10-12 04:59:08.106'),('test_3@voucher.blog','test-user-3','2023-10-12 04:59:08.106','2023-10-12 04:59:08.106'),('test_4@voucher.blog','test-user-4','2023-10-12 04:59:08.106','2023-10-12 04:59:08.106'),('test_5@voucher.blog','test-user-5','2023-10-12 04:59:08.106','2023-10-12 04:59:08.106'),('test_6@voucher.blog','test-user-6','2023-10-12 04:59:08.106','2023-10-12 04:59:08.106'),('test_7@voucher.blog','test-user-7','2023-10-12 04:59:08.106','2023-10-12 04:59:08.106'),('test_8@voucher.blog','test-user-8','2023-10-12 04:59:08.106','2023-10-12 04:59:08.106'),('test_9@voucher.blog','test-user-9','2023-10-12 04:59:08.106','2023-10-12 04:59:08.106');
/*!40000 ALTER TABLE `UserEmail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserPhoneNumber`
--

DROP TABLE IF EXISTS `UserPhoneNumber`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserPhoneNumber` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserPhoneNumber_user_id_key` (`user_id`),
  CONSTRAINT `UserPhoneNumber_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserPhoneNumber`
--

LOCK TABLES `UserPhoneNumber` WRITE;
/*!40000 ALTER TABLE `UserPhoneNumber` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserPhoneNumber` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Voucher`
--

DROP TABLE IF EXISTS `Voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Voucher` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `business_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('SALE_OFF','GIFT') COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `percent` int DEFAULT NULL,
  `value` int DEFAULT NULL,
  `max_value` int DEFAULT NULL,
  `condition_min_bill_value` int DEFAULT NULL,
  `condition_min_bill_item_count` int DEFAULT NULL,
  `condition_product_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `condition_beginning_hour` int DEFAULT NULL,
  `condition_ending_hour` int DEFAULT NULL,
  `usage` enum('ONE_TIME','UNTIL_EXPIRATION') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('AVAILABLE','SOLD_OUT','EXPIRED','DELETED') COLLATE utf8mb4_unicode_ci NOT NULL,
  `apply_date` datetime(3) NOT NULL,
  `expiration_date` datetime(3) NOT NULL,
  `count` int NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `fixed_price` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Voucher_business_id_fkey` (`business_id`),
  KEY `Voucher_condition_product_id_fkey` (`condition_product_id`),
  CONSTRAINT `Voucher_business_id_fkey` FOREIGN KEY (`business_id`) REFERENCES `Business` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Voucher_condition_product_id_fkey` FOREIGN KEY (`condition_product_id`) REFERENCES `Product` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Voucher`
--

LOCK TABLES `Voucher` WRITE;
/*!40000 ALTER TABLE `Voucher` DISABLE KEYS */;
INSERT INTO `Voucher` VALUES ('test-voucher-1','test-business-1','Test Voucher 1','SALE_OFF','https://picsum.photos/200/300','For test',10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ONE_TIME','AVAILABLE','2020-02-01 12:00:00.000','2020-02-28 12:00:00.000',9,'2023-10-02 07:41:14.689','2023-10-02 07:41:14.689',NULL),('test-voucher-2','test-business-1','Test Voucher 2','SALE_OFF','https://picsum.photos/200/300','For test',10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ONE_TIME','AVAILABLE','2020-02-01 12:00:00.000','2020-02-28 12:00:00.000',9,'2023-10-02 07:41:14.689','2023-10-02 07:41:14.689',NULL),('test-voucher-3','test-business-1','Test Voucher 3','SALE_OFF','https://picsum.photos/200/300','For test',10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ONE_TIME','AVAILABLE','2020-02-01 12:00:00.000','2020-02-28 12:00:00.000',9,'2023-10-02 07:41:14.689','2023-10-02 07:41:14.689',NULL),('test-voucher-4','test-business-2','Test Voucher 4','SALE_OFF','https://picsum.photos/200/300','For test',10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ONE_TIME','AVAILABLE','2020-02-01 12:00:00.000','2020-02-28 12:00:00.000',9,'2023-10-02 07:41:14.689','2023-10-02 07:41:14.689',NULL),('test-voucher-5','test-business-2','Test Voucher 5','SALE_OFF','https://picsum.photos/200/300','For test',10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ONE_TIME','AVAILABLE','2020-02-01 12:00:00.000','2020-02-28 12:00:00.000',9,'2023-10-02 07:41:14.689','2023-10-02 07:41:14.689',NULL),('test-voucher-6','test-business-2','Test Voucher 6','SALE_OFF','https://picsum.photos/200/300','For test',10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ONE_TIME','AVAILABLE','2020-02-01 12:00:00.000','2020-02-28 12:00:00.000',9,'2023-10-02 07:41:14.689','2023-10-02 07:41:14.689',NULL),('test-voucher-7','test-business-3','Test Voucher 7','SALE_OFF','https://picsum.photos/200/300','For test',10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ONE_TIME','AVAILABLE','2020-02-01 12:00:00.000','2020-02-28 12:00:00.000',9,'2023-10-02 07:41:14.689','2023-10-02 07:41:14.689',NULL),('test-voucher-8','test-business-3','Test Voucher 8','SALE_OFF','https://picsum.photos/200/300','For test',10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ONE_TIME','AVAILABLE','2020-02-01 12:00:00.000','2020-02-28 12:00:00.000',9,'2023-10-02 07:41:14.689','2023-10-02 07:41:14.689',NULL),('test-voucher-9','test-business-3','Test Voucher 9','SALE_OFF','https://picsum.photos/200/300','For test',10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ONE_TIME','AVAILABLE','2020-02-01 12:00:00.000','2020-02-28 12:00:00.000',9,'2023-10-02 07:41:14.689','2023-10-02 07:41:14.689',NULL);
/*!40000 ALTER TABLE `Voucher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VoucherCustomer`
--

DROP TABLE IF EXISTS `VoucherCustomer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VoucherCustomer` (
  `voucher_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `use_count` int NOT NULL DEFAULT '0',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`voucher_id`,`user_id`),
  KEY `VoucherCustomer_user_id_fkey` (`user_id`),
  CONSTRAINT `VoucherCustomer_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `VoucherCustomer_voucher_id_fkey` FOREIGN KEY (`voucher_id`) REFERENCES `Voucher` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VoucherCustomer`
--

LOCK TABLES `VoucherCustomer` WRITE;
/*!40000 ALTER TABLE `VoucherCustomer` DISABLE KEYS */;
/*!40000 ALTER TABLE `VoucherCustomer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'voucher-blog'
--
/*!50003 DROP FUNCTION IF EXISTS `CalculateDistance` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `CalculateDistance`(
    lat1 DECIMAL(9,6),
    lon1 DECIMAL(9,6),
    lat2 DECIMAL(9,6),
    lon2 DECIMAL(9,6)
) RETURNS decimal(10,2)
    DETERMINISTIC
BEGIN
    DECLARE radlat1 DECIMAL(10,6);
    DECLARE radlat2 DECIMAL(10,6);
    DECLARE radlon1 DECIMAL(10,6);
    DECLARE radlon2 DECIMAL(10,6);
    DECLARE a DECIMAL(10,6);
    DECLARE c DECIMAL(10,6);
    DECLARE d DECIMAL(10,2);

    SET radlat1 = RADIANS(lat1);
    SET radlat2 = RADIANS(lat2);
    SET radlon1 = RADIANS(lon1);
    SET radlon2 = RADIANS(lon2);

    SET a = SIN((radlat2 - radlat1) / 2) * SIN((radlat2 - radlat1) / 2) + COS(radlat1) * COS(radlat2) * SIN((radlon2 - radlon1) / 2) * SIN((radlon2 - radlon1) / 2);
    SET c = 2 * ATAN2(SQRT(a), SQRT(1 - a));
    SET d = 6371 * c; -- Earth's radius in kilometers

    RETURN d;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-12 21:07:59
