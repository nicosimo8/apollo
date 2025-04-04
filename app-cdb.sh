sudo docker exec -it apolodb mysql --user=Argos --password=Argos.123

# create the db
CREATE DATABASE IF NOT EXISTS argosapolodb;

USE argosapolodb;

CREATE TABLE configs (
  id INT NOT NULL UNIQUE,
  lightsQuantity INT NOT NULL DEFAULT 4,
  lightsMode INT NOT NULL DEFAULT 8,
  PRIMARY KEY (id)
);

CREATE TABLE lights (
	id INT NOT NULL UNIQUE,
	lightName VARCHAR(25) NOT NULL DEFAULT 'Semáforo',
	lightsNumber INT NOT NULL DEFAULT 2,
	light1 BOOLEAN DEFAULT false,
	light2 BOOLEAN DEFAULT false,
    avaible BOOLEAN DEFAULT true,
	PRIMARY KEY (id)
);

CREATE TABLE isLock (
	id INT NOT NULL UNIQUE,
    firstStart VARCHAR(50),
    lockTime VARCHAR(50),
    actualTime VARCHAR(50),
    timePass INT DEFAULT 0,
    isLocked BOOLEAN DEFAULT false
);

INSERT INTO isLock (
	id
)
VALUES (
	0
);

INSERT INTO configs (
	id
)
VALUES (
	0
);

INSERT INTO lights (
	id,
	lightName
)
VALUES (
	0,
    'Semáforo 1'
);

INSERT INTO lights (
	id,
	lightName
)
VALUES (
	1,
    'Semáforo 2'
);

INSERT INTO lights (
	id,
	lightName
)
VALUES (
	2,
    'Semáforo 3'
);

INSERT INTO lights (
	id,
	lightName
)
VALUES (
	3,
    'Semáforo 4'
);

exit