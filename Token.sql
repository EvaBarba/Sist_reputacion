CREATE TABLE BBDD_reputacion.Token (
    idToken INT AUTO_INCREMENT NOT NULL,
    tokenValue VARCHAR(255) UNIQUE NOT NULL,
    userId INT NOT NULL, -- Nueva columna para la relación
    PRIMARY KEY (idToken),
    FOREIGN KEY (userId) REFERENCES BBDD_reputacion.User(idUser) ON DELETE CASCADE
) ENGINE = InnoDB;