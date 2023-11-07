CREATE TABLE BBDD_reputacion.User(
    idUser INT AUTO_INCREMENT NOT NULL,
    password VARCHAR(55) NOT NULL,
    username VARCHAR(55) NOT NULL,
    phoneNumber VARCHAR(55),
    email VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN NOT NULL,
    PRIMARY KEY(idUser)
    )ENGINE = InnoDB;