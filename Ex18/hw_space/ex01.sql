CREATE DATABASE db01;
USE db01;
CREATE TABLE food(
 id char(5) PRIMARY KEY,
 fname varchar(30),
 expiredate datetime,
 placeid char(2),
 price int unsigned,
 catalog varchar(20)
);

CREATE TABLE place(
id char(2) PRIMARY KEY,
pname varchar(20)
);