const {statPool}=require("../db/database.ts");

exports.showStats = async function (thisYM:any) {
    const connection = await statPool.getConnection(async (conn: any) => conn);
    console.log(`connection done.`);
    try{
        const query="select * from stat where Year&Month=? OR Year&Month=?";
        //저번 달 대비 노쇼비율을 위해 저번달 통계도 같이 선택
        const params=[thisYM, thisYM-1];
        const [row]=await connection.query(query, params);
        console.log(`query done.`);
        connection.release();
        return row;
    }catch(err){
        console.error("insertReservation query error");
        connection.release();
        return false;
    }
}