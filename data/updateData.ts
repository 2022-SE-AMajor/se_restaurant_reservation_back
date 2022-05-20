const { updatePool } = require("../db/database.ts");

exports.updateReservation = async function (
    oid: any,
    covers: any,
    date: any,
    time: any,
    table_id: any,
    name: any,
    phone_number: any,
) {
    // console.log(oid, covers, date, time, table_id, name, phone_number);
    try {
        const connection = await updatePool.getConnection(async (conn: any) => conn);
        console.log("connection done");
        try {
            const query =
                "update reservation set covers=?, date=?, time=?, table_id=?, name=?, phone_number=? where oid = ?;";
            const params = [covers, date, time, table_id, name, phone_number, oid];
            const [row] = await connection.query(query, params);
            // console.log(row);
            connection.release();
            console.log("query done");
            return row;
        } catch (err) {
            console.error("updateReservation query error");
            connection.release();
            return false;
        }
    } catch (err) {
        console.error("DB connection error");
        return false;
    }
};
