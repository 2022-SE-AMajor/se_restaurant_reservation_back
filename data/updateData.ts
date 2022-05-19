const { updatePool } = require("../db/database.ts");

exports.updateReservation = async function (
    oid: any,
    covers: any,
    date: any,
    time: any,
    day: any,
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
                "update reservation set covers=?, date=?, time=?, day=?, table_id=?, name=?, phone_number=? where oid = ?;";
            const params = [covers, date, time, day, table_id, name, phone_number, oid];
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
exports.updateStatusShow = async function (oid: any) {
    try {
        const connection = await updatePool.getConnection(async (conn: any) => conn);
        console.log("connection done");
        try {
            const query = "update reservation set status=0 where oid=?";
            await connection.query(query, oid);
            console.log("query done");
            connection.release();
            return "고객이 도착했습니까? 알겠습니다.";
        } catch (err) {
            console.error("updateStatusShow query error");
            connection.release();
            return false;
        }
    } catch (err) {
        console.error("DB connection error");
        return false;
    }
};

exports.updateStatusNoShow = async function (oid: any) {
    try {
        const connection = await updatePool.getConnection(async (conn: any) => conn);
        console.log("connection done");
        try {
            const query = "update reservation set status=2 where oid=?";
            await connection.query(query, oid);
            console.log("query done");
            connection.release();
            return "약속 시간을 어겼나요? 알겠습니다.";
        } catch (err) {
            console.error("updateStatusNoShow query error");
            connection.release();
            return false;
        }
    } catch (err) {
        console.error("DB connection error");
        return false;
    }
};
exports.alreadyUpdated = async function (oid: any) {
    try {
        const connection = await updatePool.getConnection(async (conn: any) => conn);
        console.log("connection done");
        try {
            const query = "update reservation set status=-1 where oid=?";
            await connection.query(query, oid);
            console.log("query done");
            connection.release();
            return "통계에 반영했습니다.";
        } catch (err) {
            console.error("alreadyUpdated query error");
            connection.release();
            return false;
        }
    } catch (err) {
        console.error("DB connection error");
        return false;
    }
};
