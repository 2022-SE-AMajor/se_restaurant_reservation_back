const { insertPool } = require("../db/database.ts");
// import {pool} from "../db/database";
// console.log(pool);

exports.insertReservation = async function (
    covers: any,
    date: any,
    time: any,
    table_id: any,
    customer_id: any,
    arrival_time: any,
) {
    const connection = await insertPool.getConnection(async (conn: any) => conn);
    // console.log(connection);
    console.log("connection done");
    try {
        const query =
            "insert into reservation(covers, date, time, table_id, customer_id, arrival_time) values(?,?,?,?,?,?);";
        const params = [covers, date, time, table_id, customer_id, arrival_time];
        const [row] = await connection.query(query, params);
        // console.log(row);
        console.log("query done");
        connection.release();
        return row;
    } catch (err) {
        console.error("insertReservation query error");
        connection.release();
        return false;
    }
};

//test
// const {pool}=require("../db/database.ts");
// // import {pool} from "../db/database";

// exports.insertReservation=async function(covers, date, time, table_id, customer_id, arrival_time){
//     const connection = await pool.getConnection(async (conn) => conn);
//     console.log(connection);
//     // try{
//     const query="insert into reservation(covers, date, time, table_id, customer_id, arrival_time) values(?,?,?,?,?,?);";
//     const params=[covers, date, time, table_id, customer_id, arrival_time];
//     const [row]=await connection.query(query, params);
//     // console.log(row);
//     connection.release();
//     return row;
//     // }catch(err){
//     //     console.error("insertReservation query error");
//     //     connection.release();
//     //     return false;
//     // }
