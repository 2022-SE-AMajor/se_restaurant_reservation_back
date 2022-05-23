const { readPool } = require("../db/database.ts");

exports.selectTableIdList = async function (date: any, time: any) {
    try {
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
    } catch (err) {
        console.error("selectTableIdList connection error");
        return false;
    }
};

// readController에서 날짜 시간으로 조회
exports.selectReservation = async function (date: any, time: any) {
    // console.log(date, time);
    try {
        const connection = await readPool.getConnection(async (conn: any) => conn);
        console.log("connection done");
        try {
            const query = "select oid, covers, table_id, name, phone_number from reservation where date=? and time=?;";
            const params = [date, time];
            const [row] = await connection.query(query, params);
            // console.log(row);
            connection.release();
            console.log("query done");
            return row;
        } catch (err) {
            console.error("query error");
            connection.release();
            return false;
        }
    } catch (err) {
        console.error("DB connection error");
        return false;
    }
};
//updateController에서 oid로 예약 인원과 시각 조회
exports.selectCovAndTimeOfReservation = async function (oid: any) {
    try {
        const connection = await readPool.getConnection(async (conn: any) => conn);
        console.log("connection done");
        try {
            const query = "select covers, date, time from reservation where oid=?;";
            const [row] = await connection.query(query, oid);
            connection.release();
            console.log("query done");
            return row;
        } catch (err) {
            console.error("selectSpecificReservation query error");
            connection.release();
            return false;
        }
    } catch (err) {
        console.error("DB connection error");
        return false;
    }
};

exports.selectAllReservation = async function () {
    try {
        const connection = await readPool.getConnection(async (conn: any) => conn);
        console.log("connection done");
        try {
            const query = "select * from reservation;";
            const [row] = await connection.query(query);
            connection.release();
            console.log("query done");
            return row;
        } catch (err) {
            console.error("query error");
            connection.release();
            return false;
        }
    } catch (err) {
        console.error("DB connection error");
        return false;
    }
};
