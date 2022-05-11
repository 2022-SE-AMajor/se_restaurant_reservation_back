const { statPool } = require("../db/database.ts");

//모든 통계 읽기
exports.allStats = async function () {
    const connection = await statPool.getConnection(async (conn: any) => conn);
    console.log(`connection done.`);
    try {
        const query = "select * from stat";
        //일단 다 골라
        const [row] = await connection.query(query);
        console.log(`query done.`);
        connection.release();
        return row;
    } catch (err) {
        console.error("showStats query error");
        connection.release();
        return false;
    }
};
//선택한 달과 그 지난 달 통계
exports.selectStats = async function (chosenYM: any) {
    const connection = await statPool.getConnection(async (conn: any) => conn);
    console.log(`connection done.`);
    try {
        const query = "select * from stat where `year_month`=? OR `year_month`=?";
        //저번 달 대비 노쇼비율을 위해 저번달 통계도 같이 선택, 저번 달 통계가 존재하지 않으면 걍 선택한 달만 보여줌
        //쿼리문에 year_month 양 옆에 ` 안 넣으면 인식 못 함 주의, 이유는 불명, sql에 year과 month가 이미 있는 변수라 못 쓰나?
        let params;
        if (chosenYM % 20 == 1) params = [chosenYM, chosenYM - 89]; //1월이면 작년 12월 선택
        else params = [chosenYM, chosenYM - 1];
        const [row] = await connection.query(query, params);
        console.log(`query done.`);
        connection.release();
        return row;
    } catch (err) {
        console.error("showStats query error");
        connection.release();
        return false;
    }
};
