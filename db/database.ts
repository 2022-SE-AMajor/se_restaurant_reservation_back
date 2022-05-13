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

exports.createStatPool = mysql2.createPool({
    host: "localhost",
    user: "root",
    database: "restaurantreservation",
    password: "1111",
    dateStrings: "date", // date type을 string으로 받기
});

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "restaurantreservation",
    password: "1111",
});

export const db = pool.promise();

export const statPool = pool.promise();
export const updateStatPool = pool.promise();
//지금 여기에 deletePool 없음
