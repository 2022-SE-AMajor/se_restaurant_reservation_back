const { updateStatPool } = require("../db/database.ts");

exports.updateTotal = async function (thisYM: any) {
    const connection = await updateStatPool.getConnection(async (conn: any) => conn);
    try {
        const query = "update stat set month_total=month_total+1 where `year_month`=?";
        await connection.query(query, thisYM);
        console.log(`query done.`);
        connection.release();
    } catch (err) {
        console.error("updateTotal query error");
        connection.release();
    }
};

exports.reverseTotal = async function (thisYM: any) {
    const connection = await updateStatPool.getConnection(async (conn: any) => conn);
    try {
        const query = "update stat set month_total=month_total-1 where `year_month`=?";
        await connection.query(query, thisYM);
        console.log(`query done.`);
        connection.release();
    } catch (err) {
        console.error("reverseTotal query error");
        connection.release();
    }
};

exports.updateNumOfPeople = async function (thisYM: any, covers: any) {
    const connection = await updateStatPool.getConnection(async (conn: any) => conn);
    try {
        switch (covers) {
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
                const numQuery4 = "update stat set fourC=fourC+1 where `year_month`=?";
                await connection.query(numQuery4, thisYM);
                break;
            case 5:
                const numQuery5 = "update stat set fiveC=fiveC+1 where `year_month`=?";
                await connection.query(numQuery5, thisYM);
                break;
            case 6:
                const numQuery6 = "update stat set sixC=sixC+1 where `year_month`=?";
                await connection.query(numQuery6, thisYM);
                break;
            case 7:
                const numQuery7 = "update stat set sevenC=sevenC+1 where `year_month`=?";
                await connection.query(numQuery7, thisYM);
                break;
            case 8:
                const numQuery8 = "update stat set eightC=eightC+1 where `year_month`=?";
                await connection.query(numQuery8, thisYM);
                break;
            default:
                console.log(`인원이 테이블 규모보다 많거나 유효하지 않은 입력입니다.`);
                break;
        }
        console.log(`query done.`);
        connection.release();
    } catch (err) {
        console.error("updateNumOfPeople query error");
        connection.release();
    }
};

exports.reverseNumOfPeople = async function (thisYM: any, covers: any) {
    const connection = await updateStatPool.getConnection(async (conn: any) => conn);
    try {
        switch (covers) {
            case 1:
                const numQuery1 = "update stat set oneC=oneC-1 where `year_month`=?";
                await connection.query(numQuery1, thisYM);
                break;
            case 2:
                const numQuery2 = "update stat set twoC=twoC-1 where `year_month`=?";
                await connection.query(numQuery2, thisYM);
                break;
            case 3:
                const numQuery3 = "update stat set threeC=threeC-1 where `year_month`=?";
                await connection.query(numQuery3, thisYM);
                break;
            case 4:
                const numQuery4 = "update stat set fourC=fourC-1 where `year_month`=?";
                await connection.query(numQuery4, thisYM);
                break;
            case 5:
                const numQuery5 = "update stat set fiveC=fiveC-1 where `year_month`=?";
                await connection.query(numQuery5, thisYM);
                break;
            case 6:
                const numQuery6 = "update stat set sixC=sixC-1 where `year_month`=?";
                await connection.query(numQuery6, thisYM);
                break;
            case 7:
                const numQuery7 = "update stat set sevenC=sevenC-1 where `year_month`=?";
                await connection.query(numQuery7, thisYM);
                break;
            case 8:
                const numQuery8 = "update stat set eightC=eightC-1 where `year_month`=?";
                await connection.query(numQuery8, thisYM);
                break;
            default:
                console.log(`인원이 테이블 규모보다 많거나 유효하지 않은 입력입니다.`);
                break;
        }
        console.log(`query done.`);
        connection.release();
    } catch (err) {
        console.error("reverseNumOfPeople query error");
        connection.release();
    }
};

exports.updateNoShow = async function (thisYM: any, noShow: boolean) {
    const connection = await updateStatPool.getConnection(async (conn: any) => conn);
    try {
        if (noShow) {
            const absQuery = "update stat set no_show=no_show+1 where `year_month`=?";
            await connection.query(absQuery, thisYM);
        }
        console.log(`query done.`);
        connection.release();
    } catch (err) {
        console.error("updateNoShow query error");
        connection.release();
    }
};

exports.reverseNoShow = async function (thisYM: any, noShow: boolean) {
    const connection = await updateStatPool.getConnection(async (conn: any) => conn);
    try {
        if (!noShow) {
            const absQuery = "update stat set no_show=no_show-1 where `year_month`=?";
            await connection.query(absQuery, thisYM);
        }
        console.log(`query done.`);
        connection.release();
    } catch (err) {
        console.error("reverseNoShow query error");
        connection.release();
    }
};

exports.updateWeekday = async function (thisYM: any, day: any) {
    const connection = await updateStatPool.getConnection(async (conn: any) => conn);
    try {
        switch (day) {
            //case는 요일을 어떻게 받냐에 따라 글자가 올 수도 있다.
            case 2:
                const dayQuery1 = "update stat set Mon=Mon+1 where `year_month`=?";
                await connection.query(dayQuery1, thisYM);
                break;
            case 3:
                const dayQuery2 = "update stat set Tue=Tue+1 where `year_month`=?";
                await connection.query(dayQuery2, thisYM);
                break;
            case 4:
                const dayQuery3 = "update stat set Wed=Wed+1 where `year_month`=?";
                await connection.query(dayQuery3, thisYM);
                break;
            case 5:
                const dayQuery4 = "update stat set Thu=Thu+1 where `year_month`=?";
                await connection.query(dayQuery4, thisYM);
                break;
            case 6:
                const dayQuery5 = "update stat set Fri=Fri+1 where `year_month`=?";
                await connection.query(dayQuery5, thisYM);
                break;
            case 7:
                const dayQuery6 = "update stat set Sat=Sat+1 where `year_month`=?";
                await connection.query(dayQuery6, thisYM);
                break;
            case 1:
                const dayQuery7 = "update stat set Sun=Sun+1 where `year_month`=?";
                await connection.query(dayQuery7, thisYM);
                break;
            default:
                console.log(`유효하지 않은 요일입니다.`);
                break;
        }
        console.log(`query done.`);
        connection.release();
    } catch (err) {
        console.error("updateWeekday query error");
        connection.release();
    }
};

exports.reverseWeekday = async function (thisYM: any, day: any) {
    const connection = await updateStatPool.getConnection(async (conn: any) => conn);
    try {
        switch (day) {
            //case는 요일을 어떻게 받냐에 따라 글자가 올 수도 있다.
            case 2:
                const dayQuery1 = "update stat set Mon=Mon-1 where `year_month`=?";
                await connection.query(dayQuery1, thisYM);
                break;
            case 3:
                const dayQuery2 = "update stat set Tue=Tue-1 where `year_month`=?";
                await connection.query(dayQuery2, thisYM);
                break;
            case 4:
                const dayQuery3 = "update stat set Wed=Wed-1 where `year_month`=?";
                await connection.query(dayQuery3, thisYM);
                break;
            case 5:
                const dayQuery4 = "update stat set Thu=Thu-1 where `year_month`=?";
                await connection.query(dayQuery4, thisYM);
                break;
            case 6:
                const dayQuery5 = "update stat set Fri=Fri-1 where `year_month`=?";
                await connection.query(dayQuery5, thisYM);
                break;
            case 7:
                const dayQuery6 = "update stat set Sat=Sat-1 where `year_month`=?";
                await connection.query(dayQuery6, thisYM);
                break;
            case 1:
                const dayQuery7 = "update stat set Sun=Sun-1 where `year_month`=?";
                await connection.query(dayQuery7, thisYM);
                break;
            default:
                console.log(`유효하지 않은 요일입니다.`);
                break;
        }
        console.log(`query done.`);
        connection.release();
    } catch (err) {
        console.error("reverseWeekday query error");
        connection.release();
    }
};
