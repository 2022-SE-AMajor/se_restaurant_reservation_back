import mysql from "mysql2";
const mysql2 = require("mysql2/promise");

exports.insertPool = mysql2.createPool({
    host: "localhost",
    user: "root",
    database: "restaurantreservation",
    password: "1111",
});

exports.readPool = mysql2.createPool({
    host: "localhost",
    user: "root",
    database: "restaurantreservation",
    password: "1111",
    dateStrings: "date", // date type을 string으로 받기
});

exports.listPool = mysql2.createPool({
    host: "localhost",
    user: "root",
    database: "restaurantreservation",
    password: "1111",
    dateStrings: "date",
});

exports.deletePool = mysql2.createPool({
    host: "localhost",
    user: "root",
    database: "restaurantreservation",
    password: "1111",
});

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "restaurantreservation",
    password: "1111",
});

exports.autoDeletePool = mysql2.createPool({
    host: "localhost",
    user: "root",
    database: "restaurantreservation",
    password: "1111",
    dateStrings: "date",
});

export const db = pool.promise();

export const statPool = pool.promise();
export const createStatPool = pool.promise();
export const updateStatPool = pool.promise();
export const listPool = pool.promise();
export const deletePool = pool.promise();
export const autoDeletePool = pool.promise();
