const { readPool } = require("../db/database.ts");

exports.selectReservation = async function () {
    const connection = await readPool.getConnection(async (conn: any) => conn);
    // console.log(connection);
    console.log("connection done");
    try {
        const query = "select * from reservation";
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
