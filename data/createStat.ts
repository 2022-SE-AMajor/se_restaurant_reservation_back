//매 달 1일에 새로운 통계 데이터 생성
//이러면 시간이 지날수록 데이터가 많이 쌓이는데 1년 이상 지났다거나 너무 오래된 건 보존할 필요가 있을까?
const { createStatPool } = require("../db/database.ts");

exports.createStat = async function (nextYM: any) {
    const connection = await createStatPool.getConnection(async (conn: any) => conn);
    console.log(`connection done.`);
    try {
        const query = "insert into stat(`year_month`) values (?)";
        const params = nextYM;
        const [row] = await connection.query(query, params);
        console.log(`query done.`);
        connection.release();
        return row;
    } catch (err) {
        console.error("createStat query error");
        connection.release();
        return false;
    }
};