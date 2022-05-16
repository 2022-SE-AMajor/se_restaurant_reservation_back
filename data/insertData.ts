const { insertPool } = require("../db/database.ts");

exports.insertReservation = async function (
    covers: any,
    date: any,
    time: any,
    table_id: any,
    name: any,
    phone_number: any,
) {
    const connection = await insertPool.getConnection(async (conn: any) => conn);
    console.log("connection done");
    try {
        const query = "insert into reservation(covers, date, time, table_id, name, phone_number) values(?,?,?,?,?,?);";
        const params = [covers, date, time, table_id, name, phone_number];
        const [row] = await connection.query(query, params);
        console.log(row);
        connection.release();
        console.log("query done");
        return row;
    } catch (err) {
        console.error("insertReservation query error");
        connection.release();
        return false;
    }
};

exports.insertReservation = async function (
    covers: any,
    date: any,
    time: any,
    table_id: any,
    name: any,
    phone_number: any,
) {
    const connection = await insertPool.getConnection(async (conn: any) => conn);
    console.log("connection done");
    try {
        const query = "insert into reservation(covers, date, time, table_id, name, phone_number) values(?,?,?,?,?,?);";
        const params = [covers, date, time, table_id, name, phone_number];
        const [row] = await connection.query(query, params);
        console.log(row);
        connection.release();
        console.log("query done");
        return row;
    } catch (err) {
        console.error("insertReservation query error");
        connection.release();
        return false;
    }
};
