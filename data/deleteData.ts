import { time } from "console";

const { deletePool } = require("../db/database.ts");
// import {pool} from "../db/database";
// console.log(pool);

exports.deleteReservation = async function (oid: any) {
    const connection = await deletePool.getConnection(async (conn: any) => conn);
    // console.log(connection);
    console.log("connection done");
    try {
        const query = "delete from reservation where oid = ?;";
        const params = [oid];
        const [row] = await connection.query(query, params);
        // console.log(row);
        console.log("query done");
        connection.release();
        return row;
    } catch (err) {
        console.error("deleteReservation query error");
        connection.release();
        return false;
    }
};

/*exports.deleteReservation = async function (time: any) {
    const connection = await deletePool.getConnection(async (conn: any) => conn);
    // console.log(connection);
    console.log("connection done");
    try {
        const query = "delete from reservation where time = ?;";
        let now = new Date().getTime;
        if (now > time+1:00) {
            const [row] = await connection.query(query, now);
            // console.log(row);
            console.log("query done");
            connection.release();
            return row;
        } else return;
    } catch (err) {
        console.error("deleteReservation query error");
        connection.release();
        return false;
    }
};*/
