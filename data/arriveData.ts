const { arrivePool } = require("../db/database");

//export async function findArriveTime(id: any) {
//    const { oid } = id;
//    return db.execute("SELECT * from reservation where oid=?", [oid]).then((result: any) => {
//        return result[0][0];
//    });
//}

exports.findArriveTime = async function (id: any) {
    try {
        const connection = await arrivePool.getConnection(async (conn: any) => conn);
        console.log("성공");
        try {
            const table_id = id;
            console.log(table_id);
            const query = "SELECT * from reservation where table_id=?;";
            console.log(query);
            const params = table_id;
            const [row] = await connection.query(query, params);
            console.log(row);
            connection.release();
            return row;
        } catch {
            console.error("query error");
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
            const reservation = oid;
            const date = new Date();
            const time = date.toLocaleTimeString("en-GB");
            const stringTime = time.toString();
            console.log(stringTime);
            console.log(reservation);
            const query = "UPDATE arrivaltime SET arrival_time = ? WHERE oid = ?;";
            const params = [stringTime, reservation];
            const [row] = await connection.query(query, params);
            connection.release();
            return row;
        } catch {
            console.error("query error");
            connection.release();
            return false;
        }
    } catch {
        console.error(" DB error");
        return false;
    }
};
