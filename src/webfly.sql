CREATE DATABASE IF NOT EXISTS `webfly`;
USE `webfly`;

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE `utilisateur`(
   `ID_UTILISATEUR` INT(255) AUTO_INCREMENT,
   `EMAIL` VARCHAR(50) NOT NULL,
   `NOM` VARCHAR(50) NOT NULL,
   `PRENOM` VARCHAR(50) NOT NULL,
   `ENTREPRISE` VARCHAR(50) NOT NULL,
   `MDP` VARCHAR(50) NOT NULL,
   `ROLE_UTILISATEUR` VARCHAR(50) NOT NULL,
   `ETAT` VARCHAR(50) NOT NULL,
   PRIMARY KEY(`ID_UTILISATEUR`)
)
Engine = InnoDB;

DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`(
   `ID_MESSAGE` INT(255) AUTO_INCREMENT,
   `CONTENU` TEXT(255) NOT NULL,
   `DATE_MESSAGE` DATETIME,
   `ID_UTILISATEUR` INT(255) NOT NULL,
   `ID_UTILISATEUR_1` INT(255) NOT NULL,
   PRIMARY KEY(`ID_MESSAGE`),
   FOREIGN KEY(`ID_UTILISATEUR`) REFERENCES utilisateur(`ID_UTILISATEUR`) ON DELETE CASCADE,
   FOREIGN KEY(`ID_UTILISATEUR_1`) REFERENCES utilisateur(`ID_UTILISATEUR`) ON DELETE CASCADE
)
Engine = InnoDB ;

DROP TABLE IF EXISTS `calendrier`;
CREATE TABLE `calendrier`(
   `ID_CALENDRIER` INT(255) AUTO_INCREMENT,
   `TITLE` VARCHAR(50) NOT NULL,
   `DATE_CALENDRIER` DATETIME,
   `ID_UTILISATEUR` INT NOT NULL,
   PRIMARY KEY(`ID_CALENDRIER`),
   FOREIGN KEY(`ID_UTILISATEUR`) REFERENCES utilisateur(`ID_UTILISATEUR`) ON DELETE CASCADE
)
Engine = InnoDB;