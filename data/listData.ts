const { listPool } = require("../db/database.ts");

exports.listReservation = async function () {
    const connection = await listPool.getConnection(async (conn: any) => conn);
    // console.log(connection);
    console.log("connection done");

    try {
        const query = "select * from reservation;";
        const [row] = await connection.query(query);
        //console.log(row);
        console.log("query done");
        connection.release();
        return row;
    } catch (err) {
        console.error("listReservation query error");
        connection.release();
        return false;
    }
};

exports.sListReservation = async function () {
    const connection = await listPool.getConnection(async (conn: any) => conn);
    // console.log(connection);
    console.log("connection done");

    try {
        const query = "select oid, date, time from reservation;";
        const [row] = await connection.query(query);
        //console.log(row);
        console.log("query done");
        connection.release();
        return [row];
    } catch (err) {
        console.error("listReservation query error");
        connection.release();
        return false;
    }
};
