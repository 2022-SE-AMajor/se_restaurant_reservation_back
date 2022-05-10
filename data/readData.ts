const { readPool } = require("../db/database.ts");


// insertController에서 중복되는지 확인하는 용도
exports.selectDateTimeAndTableId = async function () {
    const connection = await readPool.getConnection(async (conn: any) => conn);
    // console.log(connection);
    console.log("connection done");
    try {
        const query = "select date, time, table_id from reservation";
        const [row] = await connection.query(query);
        // console.log(row);
        console.log("query done");
        connection.release();
        return row;
    } catch (err) {
        console.error("readReservation query error");
        connection.release();
        return false;
    }
};
