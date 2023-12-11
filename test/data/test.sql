-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: test
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
INSERT INTO `Business` VALUES ('6620ba66-cb1b-41cf-9f51-eae794e68438',NULL,'Business 0','This is a business','https://upload.wikimedia.org/wikipedia/en/5/55/Radioheadthebends.png','business0@voucher.blog','','',NULL,NULL,100000,500000,0,0,'ACTIVE','2023-12-11 03:52:36.095','2023-12-11 03:52:36.095');
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
INSERT INTO `BusinessAddress` VALUES ('4ae43fa3-a57c-4968-acc9-069c3b85d2b3','Hai Ba Trung, Ha Noi',NULL,NULL,'2023-12-04 07:02:17.331','2023-12-04 07:02:17.331');
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
INSERT INTO `BusinessManager` VALUES ('test','6620ba66-cb1b-41cf-9f51-eae794e68438','2023-12-11 03:53:48.269','2023-12-11 03:53:48.269');
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
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` int NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
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
  `love_count` int NOT NULL DEFAULT '0',
  `save_count` int NOT NULL DEFAULT '0',
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
INSERT INTO `Post` VALUES ('467b3022-9854-4e36-a972-22dffc8f03fc','6620ba66-cb1b-41cf-9f51-eae794e68438','ADLV BLACK FRIDAY!',0,0,'2023-12-11 04:03:53.437','2023-12-11 04:03:53.437');
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
  KEY `PostComment_post_id_fkey` (`post_id`),
  KEY `PostComment_user_id_fkey` (`user_id`),
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
INSERT INTO `PostVoucher` VALUES ('467b3022-9854-4e36-a972-22dffc8f03fc','17f98267-980d-4736-acbe-a44d32ca8d09',0),('467b3022-9854-4e36-a972-22dffc8f03fc','8301da4f-e3e3-462b-a071-1f3ac12802c7',0),('467b3022-9854-4e36-a972-22dffc8f03fc','9600643e-3794-49f4-a939-de1a1a419555',0),('467b3022-9854-4e36-a972-22dffc8f03fc','ba76785b-14ee-400a-9dd9-aeafcaafc4ce',0);
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
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar_image_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('ACTIVE','BLOCKED','DELETED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('0a7a342d-fb9e-4d81-b3a8-ff07edb1b3dd',0,'$2b$10$MWYN1WAH0eylA1tRr.Sycu0tDt2KhC.THfCdttkaJ8cGdtu/O.Jy2',NULL,NULL,'ACTIVE','2023-12-11 03:49:13.045','2023-12-11 03:49:13.045'),('1a8ed7db-fbba-4ae6-aac9-c446f5155d3e',0,'$2b$10$pW4lLcjRklzmtox/3NWFC.0g8XobFti3vEEeIAYNoR0tivJrJ2qVa',NULL,NULL,'ACTIVE','2023-12-11 03:49:19.505','2023-12-11 03:49:19.505'),('3432339e-a59f-492c-a5f6-742a372ed569',0,'$2b$10$vlORxzO6M2zUYoDCi2I53OheHfZFe8BuWcGnV72yZjaKgTonIauk.',NULL,NULL,'ACTIVE','2023-12-11 03:49:06.975','2023-12-11 03:49:06.975'),('4e9e307a-7045-4fd4-a56a-63f829a926ee',0,'$2b$10$jkL26FdRSLxEaTKykKAPSuQhgBNg4J/xa.mbxB6o1/FiBiiI/96ba',NULL,NULL,'ACTIVE','2023-12-11 03:49:28.995','2023-12-11 03:49:28.995'),('62059237-47cb-4b2e-9b3c-fb82e665ef1a',0,'$2b$10$oGUpBazkRnWX5YaNEVJRsefGOZupOiu0IN2VkjySSWrf.VZ9umj32',NULL,NULL,'ACTIVE','2023-12-11 03:49:15.902','2023-12-11 03:49:15.902'),('8a4d4e5b-d990-4263-8200-3e028d150628',0,'$2b$10$Q5xxkc3LzJ8b/420oL3WAO9EYsM7DU4yYQi05EhPt8.WMPZ791Lyq',NULL,NULL,'ACTIVE','2023-12-11 03:49:23.051','2023-12-11 03:49:23.051'),('9aec04c7-186f-4582-b471-a151910d4109',0,'$2b$10$lmDS23rjU8WSUmMkC3hIWulvtDIx8DVEsWWGg3Exm27aLrRIMeszi',NULL,NULL,'ACTIVE','2023-12-11 03:49:09.845','2023-12-11 03:49:09.845'),('9b004834-7ed3-4d91-809c-2159223f592a',0,'$2b$10$7QDcZdQIvIbxCMVOXQEuZ.EIn7xUjY5.BXKw1gBSsBE2cORMEaC2G',NULL,NULL,'ACTIVE','2023-12-11 03:49:03.851','2023-12-11 03:49:03.851'),('ebd3dfbe-89a9-49f0-8928-5a56b82de537',0,'$2b$10$tEO4QpGEzzwlKnTaywEq3uzFpinVSRuzs/8Nr7tZqIyqN.vH8tI7C',NULL,NULL,'ACTIVE','2023-12-11 03:49:26.201','2023-12-11 03:49:26.201'),('test',0,'$2b$10$1VaKvtGpFW63EpiidYUoJOegbgdyg4vN85wleMqF/8gm0NSpQoqeO',NULL,NULL,'ACTIVE','2023-12-11 03:48:39.279','2023-12-11 03:48:39.279');
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
/*!40000 ALTER TABLE `UserAddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserCollectVoucher`
--

DROP TABLE IF EXISTS `UserCollectVoucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserCollectVoucher` (
  `voucher_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`voucher_id`,`user_id`),
  KEY `UserCollectVoucher_user_id_fkey` (`user_id`),
  CONSTRAINT `UserCollectVoucher_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `UserCollectVoucher_voucher_id_fkey` FOREIGN KEY (`voucher_id`) REFERENCES `Voucher` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserCollectVoucher`
--

LOCK TABLES `UserCollectVoucher` WRITE;
/*!40000 ALTER TABLE `UserCollectVoucher` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserCollectVoucher` ENABLE KEYS */;
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
INSERT INTO `UserEmail` VALUES ('test0@voucher.blog','test','2023-12-11 03:48:39.279','2023-12-11 03:48:39.279'),('test1@voucher.blog','9b004834-7ed3-4d91-809c-2159223f592a','2023-12-11 03:49:03.851','2023-12-11 03:49:03.851'),('test2@voucher.blog','3432339e-a59f-492c-a5f6-742a372ed569','2023-12-11 03:49:06.975','2023-12-11 03:49:06.975'),('test3@voucher.blog','9aec04c7-186f-4582-b471-a151910d4109','2023-12-11 03:49:09.845','2023-12-11 03:49:09.845'),('test4@voucher.blog','0a7a342d-fb9e-4d81-b3a8-ff07edb1b3dd','2023-12-11 03:49:13.045','2023-12-11 03:49:13.045'),('test5@voucher.blog','62059237-47cb-4b2e-9b3c-fb82e665ef1a','2023-12-11 03:49:15.902','2023-12-11 03:49:15.902'),('test6@voucher.blog','1a8ed7db-fbba-4ae6-aac9-c446f5155d3e','2023-12-11 03:49:19.505','2023-12-11 03:49:19.505'),('test7@voucher.blog','8a4d4e5b-d990-4263-8200-3e028d150628','2023-12-11 03:49:23.051','2023-12-11 03:49:23.051'),('test8@voucher.blog','ebd3dfbe-89a9-49f0-8928-5a56b82de537','2023-12-11 03:49:26.201','2023-12-11 03:49:26.201'),('test9@voucher.blog','4e9e307a-7045-4fd4-a56a-63f829a926ee','2023-12-11 03:49:28.995','2023-12-11 03:49:28.995');
/*!40000 ALTER TABLE `UserEmail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserLovePost`
--

DROP TABLE IF EXISTS `UserLovePost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserLovePost` (
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`post_id`,`user_id`),
  KEY `UserLovePost_user_id_fkey` (`user_id`),
  CONSTRAINT `UserLovePost_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserLovePost_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserLovePost`
--

LOCK TABLES `UserLovePost` WRITE;
/*!40000 ALTER TABLE `UserLovePost` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserLovePost` ENABLE KEYS */;
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
-- Table structure for table `UserSavePost`
--

DROP TABLE IF EXISTS `UserSavePost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserSavePost` (
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`post_id`,`user_id`),
  KEY `UserSavePost_user_id_fkey` (`user_id`),
  CONSTRAINT `UserSavePost_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserSavePost_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserSavePost`
--

LOCK TABLES `UserSavePost` WRITE;
/*!40000 ALTER TABLE `UserSavePost` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserSavePost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserUseVoucher`
--

DROP TABLE IF EXISTS `UserUseVoucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserUseVoucher` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `voucher_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `UserUseVoucher_voucher_id_fkey` (`voucher_id`),
  KEY `UserUseVoucher_user_id_fkey` (`user_id`),
  CONSTRAINT `UserUseVoucher_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `UserUseVoucher_voucher_id_fkey` FOREIGN KEY (`voucher_id`) REFERENCES `Voucher` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserUseVoucher`
--

LOCK TABLES `UserUseVoucher` WRITE;
/*!40000 ALTER TABLE `UserUseVoucher` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserUseVoucher` ENABLE KEYS */;
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
  `type` enum('DISCOUNT','GIFT') COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `percent` int DEFAULT NULL,
  `max_value` int DEFAULT NULL,
  `value` int DEFAULT NULL,
  `fixed_price` int DEFAULT NULL,
  `usage` enum('ONE_TIME','UNTIL_EXPIRATION') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ONE_TIME',
  `status` enum('AVAILABLE','SOLD_OUT','EXPIRED','DELETED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'AVAILABLE',
  `collected_count` int NOT NULL DEFAULT '0',
  `max_use` int NOT NULL DEFAULT '0',
  `condition_min_bill_value` int DEFAULT NULL,
  `condition_beginning_hour` int DEFAULT NULL,
  `condition_ending_hour` int DEFAULT NULL,
  `condition_target` enum('ALL','SILVER','GOLD','DIAMOND') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ALL',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Voucher_business_id_fkey` (`business_id`),
  CONSTRAINT `Voucher_business_id_fkey` FOREIGN KEY (`business_id`) REFERENCES `Business` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Voucher`
--

LOCK TABLES `Voucher` WRITE;
/*!40000 ALTER TABLE `Voucher` DISABLE KEYS */;
INSERT INTO `Voucher` VALUES ('17f98267-980d-4736-acbe-a44d32ca8d09','6620ba66-cb1b-41cf-9f51-eae794e68438','ADLV 1','DISCOUNT','https://images.pexels.com/photos/5646986/pexels-photo-5646986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','BIG DISCOUNT TODAY!!!',50,100000,NULL,NULL,'ONE_TIME','AVAILABLE',0,100,NULL,NULL,NULL,'ALL','2023-12-11 03:55:59.971','2023-12-11 03:55:59.971'),('8301da4f-e3e3-462b-a071-1f3ac12802c7','6620ba66-cb1b-41cf-9f51-eae794e68438','LOYALTY','DISCOUNT','https://images.pexels.com/photos/5646986/pexels-photo-5646986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','BIG DISCOUNT TODAY!!!',NULL,NULL,NULL,1000,'ONE_TIME','AVAILABLE',0,0,NULL,NULL,NULL,'DIAMOND','2023-12-11 03:58:39.833','2023-12-11 03:58:39.833'),('9600643e-3794-49f4-a939-de1a1a419555','6620ba66-cb1b-41cf-9f51-eae794e68438',' ADLV 2','DISCOUNT','https://images.pexels.com/photos/5646986/pexels-photo-5646986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','BIG DISCOUNT TODAY!!!',NULL,NULL,NULL,100000,'ONE_TIME','AVAILABLE',0,10,NULL,NULL,NULL,'ALL','2023-12-11 03:55:58.759','2023-12-11 03:55:58.759'),('ba76785b-14ee-400a-9dd9-aeafcaafc4ce','6620ba66-cb1b-41cf-9f51-eae794e68438','ADLV 3','DISCOUNT','https://images.pexels.com/photos/5646986/pexels-photo-5646986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','BIG DISCOUNT TODAY!!!',NULL,NULL,50000,NULL,'ONE_TIME','AVAILABLE',0,500,1000000,NULL,NULL,'ALL','2023-12-11 03:55:55.365','2023-12-11 03:55:55.365');
/*!40000 ALTER TABLE `Voucher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VoucherApplyProduct`
--

DROP TABLE IF EXISTS `VoucherApplyProduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VoucherApplyProduct` (
  `voucher_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`voucher_id`,`product_id`),
  KEY `VoucherApplyProduct_product_id_fkey` (`product_id`),
  CONSTRAINT `VoucherApplyProduct_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `VoucherApplyProduct_voucher_id_fkey` FOREIGN KEY (`voucher_id`) REFERENCES `Voucher` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VoucherApplyProduct`
--

LOCK TABLES `VoucherApplyProduct` WRITE;
/*!40000 ALTER TABLE `VoucherApplyProduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `VoucherApplyProduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'test'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-11 12:05:41
