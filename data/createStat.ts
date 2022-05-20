const { createStatPool } = require("../db/database.ts");

exports.createStat = async function () {
    const connection = await createStatPool.getConnection(async (conn: any) => conn);
    console.log(`connection done.`);
    try {
        const query = "insert into stat(`year_month`) values (?)";
        const nextYear = new Date().getFullYear();
        const nextMonth = new Date().getMonth() + 1;
        let nextYM = `0`;
        if (nextMonth < 10) {
            nextYM = String(nextYear) + nextYM + String(nextMonth);
        } else {
            nextYM = String(nextYear) + String(nextMonth);
        }
        await connection.query(query, nextYM);
        console.log(`query done.`);
        connection.release();
        return "통계 생성 완료";
    } catch (err) {
        console.error("createStat query error");
        connection.release();
        return false;
    }
};
