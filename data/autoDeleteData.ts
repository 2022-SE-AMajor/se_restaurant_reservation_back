const { autoDeletePool } = require("../db/database.ts");
// import {pool} from "../db/database";
// console.log(pool);

function getDate() {
    //현재날짜
    var nowDate = new Date();
    var year = nowDate.getFullYear().toString();
    var month = nowDate.getMonth() + 1;
    var day = nowDate.getDay();
    return year + "-" + month + "-" + day;
}

function getTime() {
    //현재시간
    var nowDate = new Date();
    var hour = nowDate.getHours();
    var min = nowDate.getMinutes();
    var second = nowDate.getSeconds();
    return hour + ":" + min + ":" + second;
}

exports.autoDeleteReservation = async function (a: any) {
    //예약 날짜, 예약 시간

    const connection = await autoDeletePool.getConnection(async (conn: any) => conn);
    // console.log(connection);
    console.log("connection done");
    try {
        /*현재시간을 구해서,
        현재시간이 예약 시간보다 1시간 이상 큰 경우엔 자동 삭제
        그 이외엔 아무것도 하지 않기*/

        var nowDate = getDate();
        var nowTime = getTime();
        if (nowDate > date || (nowDate == date && nowTime > time + 1)) {
            console.log("시간 초과 자동 예약 삭제");
            const query = "delete from reservation where oid = ?;";
            const params = [oid];
            const [row] = await connection.query(query, params);
            // console.log(row);
            console.log("query done");
            connection.release();
            return row;
        } else {
            return true;
        }
    } catch (err) {
        console.error("deleteReservation query error");
        connection.release();
        return false;
    }
};
