const { updateStatPool } = require("../db/database.ts");

exports.updateStat = async function (thisYM: any, noShow: boolean, day: any, people: any) {
    const connection = await updateStatPool.getConnection(async (conn: any) => conn);
    console.log(`connection done.`);
    try {
        switch (day) {
            case `월`:
                const dayQuery1 = "update stat set Mon=Mon+1 where `year_month`=?";
                await connection.query(dayQuery1, thisYM);
                break;
            case `화`:
                const dayQuery2 = "update stat set Tue=Tue+1 where `year_month`=?";
                await connection.query(dayQuery2, thisYM);
                break;
            case `수`:
                const dayQuery3 = "update stat set Wed=Wed+1 where `year_month`=?";
                await connection.query(dayQuery3, thisYM);
                break;
            case `목`:
                const dayQuery4 = "update stat set Thu=Thu+1 where `year_month`=?";
                await connection.query(dayQuery4, thisYM);
                break;
            case `금`:
                const dayQuery5 = "update stat set Fri=Fri+1 where `year_month`=?";
                await connection.query(dayQuery5, thisYM);
                break;
            case `토`:
                const dayQuery6 = "update stat set Sat=Sat+1 where `year_month`=?";
                await connection.query(dayQuery6, thisYM);
                break;
            case `일`:
                const dayQuery7 = "update stat set Sun=Sun+1 where `year_month`=?";
                await connection.query(dayQuery7, thisYM);
                break;
            default:
                console.log(`유효하지 않은 요일입니다.`);
                break;
        }
        switch (people) {
            //스위치 문을 숫자로 비교할 순 없나?
            case 1:
                const numQuery1 = "update stat set oneC=oneC+1 where `year_month`=?";
                await connection.query(numQuery1, thisYM);
                break;
            case 2:
                const numQuery2 = "update stat set twoC=twoC+1 where `year_month`=?";
                await connection.query(numQuery2, thisYM);
                break;
            case 3:
                const numQuery3 = "update stat set threeC=threeC+1 where `year_month`=?";
                await connection.query(numQuery3, thisYM);
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
                const numQuery4 = "update stat set more_than_threeC=more_than_threeC+1 where `year_month`=?";
                await connection.query(numQuery4, thisYM);
                break;
            default:
                console.log(`인원이 테이블 규모보다 많거나 유효하지 않은 입력입니다.`);
                break;
        }
        //언제 노쇼라고 판단하고 반영할지는 미정
        //하루가 지나면 노쇼가 몇 번 있었는지 파악한 후 그만큼 추가하는 방법도 있음.
        if (noShow == true) {
            const absQuery = "update stat set no_show=no_show+1 where `year_month`=?";
            await connection.query(absQuery, thisYM);
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
