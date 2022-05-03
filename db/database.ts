import mysql from 'mysql2';

const pool = mysql.createPool({
    host:'localhost',
    user: 'root',
    database: '식당예약',
    password: 'NegaTive!TacKle99',
})

export const db = pool.promise()