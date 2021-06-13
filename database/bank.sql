DROP DATABASE IF EXISTS Bank;

CREATE DATABASE Bank;

USE Bank;

DROP TABLE IF EXISTS Accounts;

CREATE TABLE Accounts (
	name VARCHAR(50), 
	number INT, 
	balance DEC(8,2)
);

INSERT INTO Accounts VALUES ('George Smith', 3344, 1000.00);
INSERT INTO Accounts VALUES ('John Jones', 1234, 2000.00);
INSERT INTO Accounts VALUES ('Adam Miller', 1900, 3000.00);
INSERT INTO Accounts VALUES ('Sally Fields', 3666, 700.00);
INSERT INTO Accounts VALUES ('Oliver Hardy', 5555, 90000.00);
INSERT INTO Accounts VALUES ('Sam Holidays', 6666, 45600.00);
INSERT INTO Accounts VALUES ('Rachel Greene', 300550, 39000.00);
INSERT INTO Accounts VALUES ('Burt Barnow', 98333, 7008.00);


SELECT * FROM Accounts;

