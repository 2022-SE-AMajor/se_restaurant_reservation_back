const { statPool } = require("../db/database.ts");

//모든 통계 읽기
exports.allStats = async function () {
    const connection = await statPool.getConnection(async (conn: any) => conn);
    console.log(`connection done.`);
    try {
        const query = "select * from stat";
        const [row] = await connection.query(query);
        console.log(`query done.`);
        connection.release();
        return row;
    } catch (err) {
        console.error("allStats query error");
        connection.release();
        return false;
    }
};
//노쇼율 비교를 위해 선택한 달과 그 지난 달의 통계
exports.selectNoShowStats = async function (chosenYM: any) {
    const connection = await statPool.getConnection(async (conn: any) => conn);
    console.log(`connection done.`);
    try {
        const query1 = "select month_total, no_show from stat where `year_month`=?",
            query2 = "select month_total, no_show from stat where `year_month`=?";
        let lastYM;
        if (chosenYM % 20 == 1) lastYM = chosenYM - 89; //1월이면 작년 12월 선택
        else lastYM = chosenYM - 1;
        const [lastRow] = await connection.query(query1, lastYM),
            [thisRow] = await connection.query(query2, chosenYM),
            row = { lastRow, thisRow };
        console.log(lastRow, thisRow, row);
        console.log(`query done.`);
        connection.release();
        return row;
    } catch (err) {
        console.error("selectNoShowStats query error");
        connection.release();
        return false;
    }
};
//요일별 통계
exports.selectDayOfWeekStats = async function (chosenYM: any) {
    const connection = await statPool.getConnection(async (conn: any) => conn);
    console.log(`connection done.`);
    try {
        const query = "select month_total, Mon, Tue, Wed, Thu, Fri, Sat, Sun from stat where `year_month`=?";
        const [row] = await connection.query(query, chosenYM);
        console.log(`query done.`);
        connection.release();
        return row;
    } catch (err) {
        console.error("selectDayOfWeekStats query error");
        connection.release();
        return false;
    }
};
//인원별 통계
exports.selectNumOfCustStats = async function (chosenYM: any) {
    const connection = await statPool.getConnection(async (conn: any) => conn);
    console.log(`connection done.`);
    try {
        const query =
            "select month_total, oneC, twoC, threeC, fourC, fiveC, sixC, sevenC, eightC from stat where `year_month`=?";
        const [row] = await connection.query(query, chosenYM);
        console.log(`query done.`);
        connection.release();
        return row;
    } catch (err) {
        console.error("selectNumOfCustStats query error");
        connection.release();
        return false;
    }
};
//디폴트 화면, 세 개 짬뽕
exports.selectStats = async function (chosenYM: any) {
    const connection = await statPool.getConnection(async (conn: any) => conn);
    console.log(`connection done.`);
    try {
        const query = "select * from stat where `year_month`=?";
        const [row] = await connection.query(query, chosenYM);
        console.log(`query done.`);
        connection.release();
        return row;
    } catch (err) {
        console.error("selectStats query error");
        connection.release();
        return false;
    }
};
//통계의 6글자 키값 생성
/*exports.getKeyOfStat = async function (year: any, month: any) {
    if (month < 10) return String(year) + `0` + String(month);
    else return String(year) + String(month);
};*/
