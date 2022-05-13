//새로운 통계 데이터 생성은 언제?
//이러면 시간이 지날수록 데이터가 많이 쌓이는데 1년 이상 지났다거나 너무 오래된 건 보존할 필요가 있을까?
const { createStatPool } = require("../db/database.ts");

exports.createStat = async function () {
    const connection = await createStatPool.getConnection(async (conn: any) => conn);
    console.log(`connection done.`);
    try {
        const query = "insert into stat(`year_month`) values (?)";
        const nextYear = new Date().getFullYear();
        const nextMonth = new Date().getMonth();
        console.log(nextMonth, nextYear);
        let nextYM = `0`;
        if (nextMonth < 10) {
            nextYM = String(nextYear) + nextYM + String(nextMonth);
        } else {
            nextYM = String(nextYear) + String(nextMonth);
        }
        console.log(nextYM);
        const [row] = await connection.query(query, nextYM);
        console.log(`query done.`);
        connection.release();
        return row;
    } catch (err) {
        console.error("createStat query error");
        connection.release();
        return false;
    }
};
