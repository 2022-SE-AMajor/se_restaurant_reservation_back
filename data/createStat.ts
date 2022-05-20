const { createStatPool } = require("../db/database.ts");

exports.createStat = async function (newYM: any) {
    const connection = await createStatPool.getConnection(async (conn: any) => conn);
    console.log(`connection done.`);
    try {
        const query = "insert into stat(`year_month`) values (?)";
        await connection.query(query, newYM);
        console.log(`query done.`);
        connection.release();
        return "통계 생성 완료";
    } catch (err) {
        console.error("createStat query error");
        connection.release();
        return false;
    }
};
