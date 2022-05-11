exports.updateStat = async function (thisYM: any, noShow: boolean, day: any, people: any) {
    const connection = await statPool.getConnection(async (conn: any) => conn);
    //statPool을 여기서도 사용 가능한가? 오류가 발생하지 않는다면 재사용해도 괜찮은가?
    console.log(`connection done.`);
    try {
        switch (day) {
            //각 요일의 이번 달 예약 횟수를 받고 +1 해서 리턴, 겟카운트+1은 인식 못할 수도 있음
            case `월`:
                const query1 = "select Mon from stat where year_month=?";
                const getCount = await connection.query(query1, thisYM);
                const query2 = "update stat set Mon=? where year_month=?";
                connection.query(query2, [getCount + 1, thisYM]);
                break;
            default:
                //유효하지 않은 요일
                break;
        }
        switch (people) {
            //query1/2 재활용 가능한지 아직 모름
            case 1:
                const query1 = "select oneC from stat where year_month=?";
                const getCountPe = await connection.query(query1, thisYM);
                const query2 = "upsate stat set oneC=? where year_month=?";
                connection.query(query2, [query2 + 1, thisYM]);
        }
        //언제 노쇼라고 판단하고 반영할지는 미정
        //하루가 지나면 노쇼가 몇 번 있었는지 파악한 후 그만큼 추가하는 방법도 있음.
        if (noShow == true) {
            const query1 = "select no_show from stat where year_month=?";
            const getCountAb = await connection.query(query1, thisYM);
            const query2 = "update stat set no_show=? where year_month=?";
            connection.query(query2, [getCountAb + 1, thisYM]);
        }
        const query = "update stat set  (?)";
        const params = [thisYM];
        const [row] = await connection.query(query, params);
        console.log(`query done.`);
        connection.release();
        return row;
    } catch (err) {
        console.error("updateStat query error");
        connection.release();
        return false;
    }
};
