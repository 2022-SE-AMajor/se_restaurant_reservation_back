import mysql from "mysql2";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "restaurantreservation",
    password: "1111",
});

export const db = pool.promise();
export const readPool = pool.promise();
export const insertPool = pool.promise();
export const statPool = pool.promise();
export const createStatPool = pool.promise();
