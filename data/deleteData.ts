const { deletePool } = require("../db/database.ts");
// import {pool} from "../db/database";
// console.log(pool);

exports.deleteReservation = async function (oid: any) {
    const connection = await deletePool.getConnection(async (conn: any) => conn);
    // console.log(connection);
    console.log("connection done");
    try {
        const query1 = "delete from arrivaltime where oid = ?;";
        const params1 = [oid];
        connection.query(query1, params1);
        // console.log(row);
        const query2 = "delete from reservation where oid = ?;";
        const params2 = [oid];
        connection.query(query2, params2);
        console.log("query done");
        connection.release();
        return true;
    } catch (err) {
        console.error("deleteReservation query error");
        connection.release();
        return false;
    }
};
