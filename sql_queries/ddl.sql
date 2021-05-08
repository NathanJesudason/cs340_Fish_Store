--Creating Tables
CREATE TABLE Feeds(
feed_id INT AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
stock INT NOT NULL,
PRIMARY KEY (feed_id)
);

CREATE TABLE Pumps(
pump_id INT AUTO_INCREMENT,
flow_rate DECIMAL(6,2) NOT NULL,
age INT NOT NULL,
PRIMARY KEY (pump_id)
);

CREATE TABLE Tanks(
tank_id INT AUTO_INCREMENT,
volume INT NOT NULL,
pump_id INT,
FOREIGN KEY (pump_id) REFERENCES Pumps(pump_id),
PRIMARY KEY (tank_id)
);

CREATE TABLE Fishes(
fish_id INT AUTO_INCREMENT,
species VARCHAR(100) NOT NULL,
age INT NOT NULL,
tank_id INT,
volume_needed DECIMAL(6,2) NOT NULL,
FOREIGN KEY(tank_id) REFERENCES Tanks(tank_id),
PRIMARY KEY (fish_id)
);

CREATE TABLE Plants(
plant_id INT AUTO_INCREMENT,
species VARCHAR(100) NOT NULL,
tank_id INT,
FOREIGN KEY (tank_id) REFERENCES Tanks(tank_id),
PRIMARY KEY (plant_id)
);

--Adding data into the tables
INSERT INTO Feeds(name, stock) VALUES
("Bread Crumbs", 10),
("Salmon", 20),
("Cake", 15);

INSERT INTO Pumps(flow_rate, age) VALUES
(5.6, 1),
(4.32, 2),
(3.37, 1);

INSERT INTO Tanks(volume, pump_id) VALUES
(100, 1),
(120, 3),
(110, 2);

INSERT INTO Fishes(species, age, tank_id, volume_needed) VALUES
("Salmon", 3, 1, 7),
("Tuna", 1, 1, 2),
("Flounder", 5, 1, 10),
("Squid", 11, 2, 20);

INSERT INTO Plants(species, tank_id) VALUES
("Seaweed", 1),
("Poison Ivy", 1),
("Sword Fern", 3);