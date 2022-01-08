DROP SCHEMA IF EXISTS bkts;
create database bkts;

use bkts;

drop table if exists location;
create table location(
    lcid bigint primary key  AUTO_INCREMENT,
    lcname varchar(50) COLLATE utf8_general_ci null
);

drop table if exists review;
create table review
(
    rvid  bigint primary key  AUTO_INCREMENT,
    userid bigint not null,
    tourid    bigint not null,
    content varchar(100) COLLATE utf8_general_ci null
);

drop table if exists register;
create table register(
    rId      bigint not null primary key AUTO_INCREMENT,
    userId  bigint not null,
    tourId bigint not null,
    dateRegister  datetime default current_timestamp,
    quantity int default 1,
    price float not null
);

drop table if exists payment;
create table payment(
    paymentid bigint not null  primary key AUTO_INCREMENT,
    registerid bigint not null,
    type char(1) not null,
    totalmoney float not null
);

drop table if exists tour;
create table tour(
                     tourid     bigint        not null primary key AUTO_INCREMENT ,
                     agencyid      bigint        null,
                     tourname   varchar(50)   COLLATE utf8_general_ci null,
                     title         varchar(50)   COLLATE utf8_general_ci null,
                     description   varchar(200)  COLLATE utf8_general_ci null,
                     location          bigint        null,
                     price         float         null,
                     datepublished datetime      default current_timestamp,
                     datestart     datetime      null,
                     dateend       datetime      null
);

drop table if exists location;
create table location(
    lid     bigint        not null primary key AUTO_INCREMENT ,
    lname   varchar(100)   COLLATE utf8_general_ci null
);


drop table if exists rating;
create table rating
(
    ratingid bigint       not null primary key AUTO_INCREMENT ,
    userid   bigint       null,
    tourid bigint       null,
    feedback varchar(50)   COLLATE utf8_general_ci null,
    date     datetime default current_timestamp,
    rate     float          null
);

drop table if exists user;
create table user
(
    userid      bigint       not null primary key AUTO_INCREMENT,
    fullname    varchar(50)   COLLATE utf8_general_ci null,
    dob         date         null,
    address     varchar(50)   COLLATE utf8_general_ci null,
    telephone   char(10)     null,
    email       varchar(50)   COLLATE utf8_general_ci null,
    username    varchar(30)   COLLATE utf8_general_ci null,
    password    varchar(150)   COLLATE utf8_general_ci null,
    role        varchar(10)   COLLATE utf8_general_ci,
    active      int          default 1,
    datefounded datetime     default CURRENT_TIMESTAMP
);


