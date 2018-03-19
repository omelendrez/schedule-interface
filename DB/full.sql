-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: escng_schedule
-- ------------------------------------------------------
-- Server version	5.7.18-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `availability`
--

DROP TABLE IF EXISTS `availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `availability` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `week_day` int(11) NOT NULL,
  `from` char(2) NOT NULL,
  `to` char(2) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `availability_employee_id` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `availability`
--

LOCK TABLES `availability` WRITE;
/*!40000 ALTER TABLE `availability` DISABLE KEYS */;
INSERT INTO `availability` VALUES (3,2,2,'13','14','2018-02-21 15:55:18','2018-02-21 15:55:18'),(5,1,2,'8','12','2018-02-21 16:06:19','2018-02-21 16:06:19'),(6,3,1,'15','18','2018-02-21 18:48:36','2018-02-21 18:48:36');
/*!40000 ALTER TABLE `availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `branch` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status_id` int(11) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (1,'Donado',1,'2018-02-21 14:35:38','2018-02-21 14:35:38');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `budget`
--

DROP TABLE IF EXISTS `budget`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `budget` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `branch_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `hours` int(11) NOT NULL,
  `footer` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `budget_date_branch_id` (`date`,`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budget`
--

LOCK TABLES `budget` WRITE;
/*!40000 ALTER TABLE `budget` DISABLE KEYS */;
INSERT INTO `budget` VALUES (21,1,'2018-02-21',140,'','2018-02-21 15:06:53','2018-02-21 15:06:53'),(22,1,'2018-02-22',142,'','2018-02-21 15:07:03','2018-02-21 15:07:03'),(23,1,'2018-02-23',160,'','2018-02-21 16:02:15','2018-02-21 16:02:15'),(24,1,'2018-02-24',180,'','2018-02-21 16:02:29','2018-02-21 16:02:29');
/*!40000 ALTER TABLE `budget` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `badge` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `joining_date` date NOT NULL,
  `status_id` int(11) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'E-001','Martinez','José',1,'2017-11-01',1,'2018-02-21 15:14:49','2018-02-21 15:14:49'),(2,'E-002','Forge','Marcela',1,'2016-11-15',1,'2018-02-21 15:31:54','2018-02-21 15:31:54'),(3,'125','GARAT','PEDRO',1,'2016-02-12',1,'2018-02-21 15:58:16','2018-02-21 15:58:16'),(4,'129','ALISONE','MAXIMILIANO',1,'2014-10-14',1,'2018-02-21 15:59:15','2018-02-21 15:59:15'),(5,'25','CASATTI','CLAUDIA',1,'2010-05-20',1,'2018-02-21 16:00:23','2018-02-21 16:00:23'),(6,'40','DELGADO','DAMIAN',1,'2009-11-24',1,'2018-02-21 16:01:12','2018-02-21 16:01:12'),(7,'123','MUÑOZ','DARIO',1,'2011-10-02',1,'2018-02-22 12:05:21','2018-02-22 12:05:21');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_position`
--

DROP TABLE IF EXISTS `employee_position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee_position` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `position_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_position_employee_id` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_position`
--

LOCK TABLES `employee_position` WRITE;
/*!40000 ALTER TABLE `employee_position` DISABLE KEYS */;
INSERT INTO `employee_position` VALUES (7,2,2,'2018-02-21 15:55:18','2018-02-21 15:55:18'),(8,2,3,'2018-02-21 15:55:18','2018-02-21 15:55:18'),(9,2,6,'2018-02-21 15:55:18','2018-02-21 15:55:18'),(16,4,4,'2018-02-21 15:59:15','2018-02-21 15:59:15'),(17,4,5,'2018-02-21 15:59:15','2018-02-21 15:59:15'),(18,4,6,'2018-02-21 15:59:15','2018-02-21 15:59:15'),(19,4,7,'2018-02-21 15:59:15','2018-02-21 15:59:15'),(20,4,9,'2018-02-21 15:59:15','2018-02-21 15:59:15'),(21,5,2,'2018-02-21 16:00:23','2018-02-21 16:00:23'),(22,5,3,'2018-02-21 16:00:23','2018-02-21 16:00:23'),(23,5,4,'2018-02-21 16:00:23','2018-02-21 16:00:23'),(24,5,5,'2018-02-21 16:00:23','2018-02-21 16:00:23'),(25,5,6,'2018-02-21 16:00:23','2018-02-21 16:00:23'),(26,5,9,'2018-02-21 16:00:23','2018-02-21 16:00:23'),(27,6,1,'2018-02-21 16:01:12','2018-02-21 16:01:12'),(28,6,2,'2018-02-21 16:01:12','2018-02-21 16:01:12'),(29,6,3,'2018-02-21 16:01:12','2018-02-21 16:01:12'),(30,6,4,'2018-02-21 16:01:12','2018-02-21 16:01:12'),(31,6,8,'2018-02-21 16:01:12','2018-02-21 16:01:12'),(32,6,10,'2018-02-21 16:01:12','2018-02-21 16:01:12'),(33,1,1,'2018-02-21 16:06:19','2018-02-21 16:06:19'),(34,1,4,'2018-02-21 16:06:19','2018-02-21 16:06:19'),(35,1,3,'2018-02-21 16:06:19','2018-02-21 16:06:19'),(36,3,6,'2018-02-21 18:48:35','2018-02-21 18:48:35'),(37,3,7,'2018-02-21 18:48:35','2018-02-21 18:48:35'),(38,3,8,'2018-02-21 18:48:35','2018-02-21 18:48:35'),(39,3,9,'2018-02-21 18:48:35','2018-02-21 18:48:35'),(40,3,11,'2018-02-21 18:48:35','2018-02-21 18:48:35'),(41,3,4,'2018-02-21 18:48:35','2018-02-21 18:48:35'),(45,7,3,'2018-02-27 12:08:42','2018-02-27 12:08:42'),(46,7,2,'2018-02-27 12:08:42','2018-02-27 12:08:42'),(47,7,6,'2018-02-27 12:08:42','2018-02-27 12:08:42');
/*!40000 ALTER TABLE `employee_position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `position` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sector_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `position_sector_id` (`sector_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES (1,1,'Entrenamiento','#ffff00','2018-02-21 14:35:38','2018-02-21 15:31:00'),(2,2,'Elaboración','#000000','2018-02-21 14:35:39','2018-02-21 16:14:30'),(3,2,'Cocción','#c0c0c0','2018-02-21 14:35:39','2018-02-21 16:14:53'),(4,3,'Runner','#ff0000','2018-02-21 14:35:39','2018-02-21 16:13:28'),(5,3,'Cajero','#ff0080','2018-02-21 14:35:39','2018-02-21 16:15:30'),(6,4,'Barra','#00ff00','2018-02-21 14:35:39','2018-02-21 16:15:45'),(7,4,'Mozo','#00ff00','2018-02-21 14:35:39','2018-02-21 16:14:13'),(8,5,'Servicio','#0000ff','2018-02-21 14:35:39','2018-02-21 16:12:46'),(9,5,'Valle','#ffa74f','2018-02-21 14:35:39','2018-02-21 15:30:30'),(10,6,'Depositos','#008000','2018-02-21 14:35:39','2018-02-21 16:13:08'),(11,7,'Eventos','#ff00ff','2018-02-21 14:35:39','2018-02-21 15:31:08');
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (1,'Administrador','2018-02-21 14:35:38','2018-02-21 14:35:38'),(2,'Supervisor','2018-02-21 14:35:38','2018-02-21 14:35:38');
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `budget_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `position_id` int(11) NOT NULL,
  `from` int(11) NOT NULL,
  `to` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `schedule_budget_id` (`budget_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (10,21,1,1,7,10,'2018-02-21 15:54:09','2018-02-21 15:54:09'),(11,21,1,4,10,18,'2018-02-21 15:54:31','2018-02-21 15:54:31'),(12,21,2,2,8,15,'2018-02-21 15:55:47','2018-02-21 15:55:47'),(13,22,3,6,7,15,'2018-02-21 16:03:36','2018-02-21 16:03:36'),(14,22,4,6,14,21,'2018-02-21 16:05:08','2018-02-21 16:05:08'),(15,22,6,2,7,16,'2018-02-21 16:05:25','2018-02-21 16:05:25'),(16,22,5,3,15,21,'2018-02-21 16:05:47','2018-02-21 16:05:47'),(17,22,1,3,18,24,'2018-02-21 16:06:50','2018-02-21 16:06:50'),(18,22,2,6,18,20,'2018-02-21 16:07:51','2018-02-21 18:55:25'),(19,22,2,3,20,24,'2018-02-21 18:55:50','2018-02-21 18:55:50'),(20,22,7,3,10,18,'2018-02-22 12:05:56','2018-02-22 12:05:56'),(21,23,5,4,12,20,'2018-02-27 12:11:42','2018-02-27 12:11:42');
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sector`
--

DROP TABLE IF EXISTS `sector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sector` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sector`
--

LOCK TABLES `sector` WRITE;
/*!40000 ALTER TABLE `sector` DISABLE KEYS */;
INSERT INTO `sector` VALUES (1,'Entrenamiento','2018-02-21 14:35:38','2018-02-21 14:35:38'),(2,'Cocina','2018-02-21 14:35:38','2018-02-21 14:35:38'),(3,'Cajas','2018-02-21 14:35:38','2018-02-21 14:35:38'),(4,'Cafetería','2018-02-21 14:35:38','2018-02-21 14:35:38'),(5,'Salón','2018-02-21 14:35:38','2018-02-21 14:35:38'),(6,'Depositos','2018-02-21 14:35:38','2018-02-21 14:35:38'),(7,'Eventos','2018-02-21 14:35:38','2018-02-21 14:35:38');
/*!40000 ALTER TABLE `sector` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Activo','2018-02-21 14:35:38','2018-02-21 14:35:38'),(2,'Inactivo','2018-02-21 14:35:38','2018-02-21 14:35:38');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timeoff`
--

DROP TABLE IF EXISTS `timeoff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `timeoff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `timeoff_employee_id` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timeoff`
--

LOCK TABLES `timeoff` WRITE;
/*!40000 ALTER TABLE `timeoff` DISABLE KEYS */;
/*!40000 ALTER TABLE `timeoff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT '123',
  `full_name` varchar(255) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `status_id` int(11) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'omar.melendrez','master1*','Omar Melendrez',1,1,'2018-02-21 14:35:38','2018-02-21 14:35:38'),(2,'alejandro','123','Alejandro Valentini',1,1,'2018-02-21 15:01:40','2018-02-22 12:00:57'),(3,'gustavo','123','Gustavo Buffo',1,1,'2018-02-21 15:50:03','2018-02-21 15:50:03');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'escng_schedule'
--
/*!50003 DROP PROCEDURE IF EXISTS `check_blocked` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `check_blocked`(_from int, _to int, _budget_id int, _employee_id int)
BEGIN

	SELECT e.`first_name`, a.`from`, a.`to` FROM availability AS a
    INNER JOIN employee as e ON e.id = a.employee_id 
    WHERE a.employee_id = _employee_id
    AND a.week_day = (SELECT weekday(date) FROM budget AS b WHERE b.id = _budget_id)
    AND(
		a.`from` BETWEEN _from AND _to
        OR
		a.`to` BETWEEN _from AND _to
        OR
		_from BETWEEN a.`from` AND a.`to`
        OR
		_to BETWEEN a.`from` AND a.`to`
        );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `check_overwrite` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `check_overwrite`(_id int, _from int, _to int, _budget_id int, _employee_id int)
BEGIN

	SELECT e.`first_name`, s.`from`, s.`to` 
    FROM schedule AS s
    INNER JOIN employee AS e ON e.id = s.employee_id 
    WHERE ((_from between s.from and s.to-1) OR (_to between s.from+1 and s.to)) 
    AND s.budget_id=_budget_id
    AND s.employee_id=_employee_id
    AND (_employee_id = 0) 
    LIMIT 1;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_presence` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `get_presence`(_budget_id INT)
BEGIN

	SET @report_date = (SELECT date FROM budget WHERE id =  `_budget_id`);
    SET @from_date = DATE_ADD(@report_date, INTERVAL -6 DAY);
    SET @to_date = DATE_ADD(@report_date, INTERVAL -1 DAY);
	SELECT 
    e.id,
    e.badge,
    e.last_name,
    e.first_name,
    (SELECT 
            COUNT(*)
        FROM
            budget AS b
        WHERE
            b.date BETWEEN @from_date AND @to_date
                AND b.id IN (SELECT 
                    s.budget_id
                FROM
                    schedule AS s
                WHERE
                    s.employee_id = e.id)) AS presence
FROM
    employee AS e
GROUP BY e.id , e.badge , e.last_name , e.first_name;

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

-- Dump completed on 2018-03-02 14:15:13
