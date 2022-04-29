import mysql from 'mysql2';

const pool = mysql.createPool({
    host:'localhost',
    user: 'root',
    database: 'restaurantreservation',
    password: '1111',
})

export const db = pool.promise()