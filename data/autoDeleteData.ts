const { autoDeletePool } = require("../db/database.ts");
// import {pool} from "../db/database";
// console.log(pool);

exports.autoDeleteReservation = async function (a: any) {
    //예약 날짜, 예약 시간
    const connection = await autoDeletePool.getConnection(async (conn: any) => conn);
    // console.log(connection);
    console.log("connection done");
    for (var i = 0; i < a.length; i++) {
        console.log(a[i].oid, a[i].date, a[i].time);
        try {
            const sdate = JSON.stringify(a[i].date);
            const ssdate = sdate.substring(1, 11);
            const stime = JSON.stringify(a[i].time);
            const sstime = stime.substring(1, 9);
            const now = new Date();
            const dateTime = new Date(ssdate + "T" + sstime);
            dateTime.setHours(dateTime.getHours() + 1);

            if (now > dateTime) {
                console.log("시간 초과 자동 예약 삭제");
                const query = "delete from reservation where oid = ?;";
                const params = [a[i].oid];
                const [row] = await connection.query(query, params);
                // console.log(row);
                console.log("query done");
                connection.release();
            } else {
                console.log("else문 실행: 자동 예약 삭제 해당사항 없음");
            }
        } catch (err) {
            console.error("deleteReservation query error");
            connection.release();
            return false;
        }
    }
    return true;
};
