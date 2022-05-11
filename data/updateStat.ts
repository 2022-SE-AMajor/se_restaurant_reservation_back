const { updateStatPool } = require("../db/database.ts");

exports.updateStat = async function (thisYM: any, noShow: boolean, day: any, people: any) {
    const connection = await updateStatPool.getConnection(async (conn: any) => conn);
    console.log(`connection done.`);
    try {
        switch (day) {
            case `월`:
                const query1 = "update stat set Mon=Mon+1 where `year_month`=?";
                await connection.query(query1, thisYM);
                break;
            default:
                //유효하지 않은 요일
                break;
        }
        switch (people) {
            //스위치 문을 숫자로 비교할 순 없나?
            case 1:
                const query2 = "upsate stat set oneC=oneC+1 where `year_month`=?";
                await connection.query(query2, thisYM);
                break;
            default:
                //지원하지 못하는 규모거나 유효하지 않은 인원
                break;
        }
        //언제 노쇼라고 판단하고 반영할지는 미정
        //하루가 지나면 노쇼가 몇 번 있었는지 파악한 후 그만큼 추가하는 방법도 있음.
        if (noShow == true) {
            const query3 = "update stat set no_show=no_show+1 where `year_month`=?";
            await connection.query(query3, thisYM);
        }

        const query = "update stat set month_total=month_total+1 where `year_month`=?";
        //month_total+=1이나 month_total++은 못하지만 저건 된다.
        await connection.query(query, thisYM);

        console.log(`query done.`);
        connection.release();
        return "잘 수정됐다구~";
    } catch (err) {
        console.error("updateStat query error");
        connection.release();
        return false;
    }
};
