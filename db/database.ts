import mysql from "mysql2";

const mysql2 = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "restaurantreservation",
    password: "1111",
});

export const db = pool.promise();

exports.arrivePool = mysql2.createPool({
    host: "localhost",
    user: "root",
    database: "restaurantreservation",
    password: "1111",
    dateStrings: "date",
});
