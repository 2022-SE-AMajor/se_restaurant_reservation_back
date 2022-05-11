const { statPool } = require("../db/database.ts");
//선택한 달의 통계 읽기

exports.selectStats = async function (/*chosenYM: any*/) {
    const connection = await statPool.getConnection(async (conn: any) => conn);
    console.log(`connection done.`);
    try {
        //const query = "select * from stat where year_month=? OR year_month=?";
        const query = "select * from stat";
        //저번 달 대비 노쇼비율을 위해 저번달 통계도 같이 선택
        //일단 다 골라
        let params;
        /*if (chosenYM % 20 == 1) params = [chosenYM, chosenYM - 89]; //1월이면 작년 12월 선택
        else params = [chosenYM, chosenYM - 1];*/
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
