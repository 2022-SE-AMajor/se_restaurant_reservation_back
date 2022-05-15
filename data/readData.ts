const { readPool } = require("../db/database.ts");

exports.selectTableIdList = async function (date: any, time: any) {
    const connection = await readPool.getConnection(async (conn: any) => conn);
    // console.log(connection);
    console.log("connection done");
    try {
        const query = "select table_id from reservation where date=? and time = ?";
        const params = [date, time];
        const [row] = await connection.query(query, params);
        // console.log(row);
        console.log("query done");
        connection.release();
        return row;
    } catch (err) {
        console.error("query error");
        connection.release();
        return false;
    }
};

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
        console.error("query error");
        connection.release();
        return false;
    }
};

// readController에서 날짜 시간으로 조회
exports.selectReservation = async function (selectedDate: any, selectedTime: any) {
    const connection = await readPool.getConnection(async (conn: any) => conn);
    console.log(selectedDate + selectedTime);
    console.log("connection done");
    try {
        const query = "select table_id, name, phone_number from reservation where date=? and time=?;";
        const params = [selectedDate, selectedTime];
        const [row] = await connection.query(query, params);
        console.log(row);
        console.log("query done");
        connection.release();
        return row;
    } catch (err) {
        console.error("query error");
        connection.release();
        return false;
    }
};
