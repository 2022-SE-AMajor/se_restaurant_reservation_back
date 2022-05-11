import mysql from "mysql2";
const mysql2 = require("mysql2/promise");
/*database: "restaurantreservation",
    password: "1111",
    database: "식당예약",
    password: "NegaTive!TacKle99",
*/

exports.insertPool = mysql2.createPool({
    host: "localhost",
    user: "root",
    database: "식당예약",
    password: "NegaTive!TacKle99",
});

exports.readPool = mysql2.createPool({
    host: "localhost",
    user: "root",
    database: "식당예약",
    password: "NegaTive!TacKle99",
    dateStrings: "date", // date type을 string으로 받기
});

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "식당예약",
    password: "NegaTive!TacKle99",
});

export const db = pool.promise();

export const statPool = pool.promise();
export const createStatPool = pool.promise();
export const updateStatPool = pool.promise();
