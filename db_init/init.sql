create user IF NOT EXISTS 'user'@'%' identified by 'pass';
grant all privileges on *.* to 'user'@'%' with grant option;
flush privileges;
create database if not exists thursreport_db;
use thursreport_db;
create table if not exists users (
    uid int NOT NULL AUTO_INCREMENT,
    fbid varchar(255),
    email varchar(255),
    name varchar(255),
    access_token varchar(255),
    PRIMARY KEY (uid)
);
-- INSERT INTO users (email) VALUES ('mrcmarketing@mrc.org');