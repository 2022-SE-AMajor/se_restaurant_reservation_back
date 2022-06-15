
import mysql from 'mysql2';

const ps = 'gkdidtor!080'

const pool = mysql.createPool({
    host:'localhost',
    user: 'root',
    database: 'restaurantreservation',
    password: ps,
})

export const db = pool.promise()

// import mysql from "mysql2";
const mysql2 = require("mysql2/promise");

exports.insertPool = mysql2.createPool({
    host: "localhost",
    user: "root",
    database: "restaurantreservation",
    password: ps,
});

exports.readPool = mysql2.createPool({
    host: "localhost",
    user: "root",
    database: "restaurantreservation",
    password: ps,
    dateStrings: "date", // date type을 string으로 받기
});

exports.updatePool = mysql2.createPool({
    host: "localhost",
    user: "root",
    database: "restaurantreservation",
    password: ps,
});

exports.listPool = mysql2.createPool({
    host: "localhost",
    user: "root",
    database: "restaurantreservation",
    password: ps,
    dateStrings: "date",
});

exports.deletePool = mysql2.createPool({
    host: "localhost",
    user: "root",
    database: "restaurantreservation",
    password: ps,
    dateStrings: "date", // date type을 string으로 받기
});

// exports.autoDeletePool = mysql2.createPool({
//     host: "localhost",
//     user: "root",
//     database: "restaurantreservation",
//     password: "1111",
//     dateStrings: "date", // date type을 string으로 받기
// });

// const pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     database: "restaurantreservation",
//     password: "1111",
// });

// export const db = pool.promise();

exports.arrivePool = mysql2.createPool({
    host: "localhost",
    user: "root",
    database: "restaurantreservation",
    password: ps,
    dateStrings: "date",
});
export const statPool = pool.promise();
export const createStatPool = pool.promise();
export const updateStatPool = pool.promise();
