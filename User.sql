CREATE TABLE BBDD_reputacion.User(
    Id_User INT AUTO_INCREMENT NOT NULL,
    Password VARCHAR(55) NOT NULL,
    Nombre VARCHAR(55) NOT NULL,
    PhoneNumber VARCHAR(55),
    Email VARCHAR(255) NOT NULL,
    PRIMARY KEY(Id_User)
    )ENGINE = InnoDB;