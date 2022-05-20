const { arrivePool } = require("../db/database");

//export async function findArriveTime(id: any) {
//    const { oid } = id;
//    return db.execute("SELECT * from reservation where oid=?", [oid]).then((result: any) => {
//        return result[0][0];
//    });
//}

exports.findArriveTime = async function (id: any, date: any, time: any) {
    try {
        const connection = await arrivePool.getConnection(async (conn: any) => conn);
        console.log("성공");
        try {
            const table_id = id.toString();
            const Rdate = date;
            const Rtime = time;
            console.log(table_id);
            console.log(Rdate);
            console.log(Rtime);
            const query = "SELECT * from reservation where table_id=? AND date=? AND time=?";
            console.log(query);
            const params = [table_id, Rdate, Rtime];
            console.log(params);
            const [row] = await connection.query(query, params);
            console.log(row);
            connection.release();
            return row;
        } catch {
            console.error("error");
            connection.release();
            return false;
        }
    } catch {
        console.error(" DB error");
        return false;
    }
};

exports.insertArrival = async function (oid: any) {
    try {
        const connection = await arrivePool.getConnection(async (conn: any) => conn);
        try {
            const reservation = oid.toString();
            const date = new Date();
            const time = date.toLocaleTimeString("en-GB");
            const stringTime = time.toString();
            console.log(stringTime);
            console.log(reservation);
            const query = "INSERT INTO arrivaltime (`oid`, `arrival_time`) VALUES (?, ?);";
            const params = [reservation, stringTime];
            console.log(params);
            const [row] = await connection.query(query, params);
            console.log("query success");
            connection.release();
            return row;
        } catch {
            console.error("이미 도착기록이 기록되어있습니다.");
            connection.release();
            return false;
        }
    } catch {
        console.error(" DB error");
        return false;
    }
};
