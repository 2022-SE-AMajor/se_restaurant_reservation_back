const { insertReservation } = require("../data/insertData");
const { selectTableIdList } = require("../data/readData");
const { sListReservation } = require("../data/listData"); // import sListReservation **자동 삭제 참고할 부분
const { autoDeleteReservation } = require("../data/autoDeleteData"); // import autoDeleteReservation **자동 삭제 참고할 부분
const { updateTotal, updateNumOfPeople, updateWeekday, updateNoShow } = require("../data/updateStat");
import { Request, Response } from "express";

export async function ajaxOutPutTableList(req: Request, res: Response) {
    const { year, month, date, time } = req.body;
    // console.log(year, month, date, time);
    const selectedDate = `${year}-${month}-${date}`;
    let now = new Date();
    let dateTime = new Date(`${selectedDate}T${time}`);
    // console.log(now);
    // console.log(dateTime);
    if (now > dateTime) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "에러: 지난 날짜입니다.",
        });
    }
    const [a] = await sListReservation(); // select 현재 전체 예약 현황 **자동 삭제 참고할 부분
    const autoDeleteReservationRow = await autoDeleteReservation(a); // 갱신 **자동 삭제 참고할 부분

    if (autoDeleteReservationRow) {
        console.log("자동 예약 삭제 성공");
    } else {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "시간 초과 자동 예약 삭제 실패",
        });
    }
    const selectTableIdListRow = await selectTableIdList(selectedDate, time);

    let TableList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    for (var i = 0; i < selectTableIdListRow.length; i++) {
        // console.log(selectTableIdListRow[i]);
        delete TableList[selectTableIdListRow[i].table_id - 1];
    }
    // console.log(TableList);

    if (selectTableIdListRow.length == 16) {
        return res.send({
            isSuccess: true,
            code: 200,
            message: "선택한 시간에 예약할 수 있는 테이블이 없습니다.",
        });
    } else if (selectTableIdListRow) {
        return res.send({
            result: {
                date: selectedDate,
                time: time,
                table_id_list: TableList,
            },
            isSuccess: true,
            code: 200,
            message: "선택한 시간에 예약 가능한 테이블을 조회 했습니다.",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 404,
            message: "에러: DB 연동 비정상",
        });
    }
}

export async function createReservationOnSite(req: Request, res: Response) {
    const { date, time } = req.query;
    const { covers, table_id, name, phone_number } = req.body;
    // console.log(date, time);
    // console.log(covers, table_id, name, phone_number);

    const [a] = await sListReservation(); // select 현재 전체 예약 현황 **자동 삭제 참고할 부분
    const autoDeleteReservationRow = await autoDeleteReservation(a); // 갱신 **자동 삭제 참고할 부분

    if (autoDeleteReservationRow) {
        console.log("자동 예약 삭제 성공");
    } else {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "시간 초과 자동 예약 삭제 실패",
        });
    }

    const thisYear = new Date(`${date}`).getFullYear(),
        thisMonth = new Date(`${date}`).getMonth() + 1;
    let thisYM = `0`;
    if (thisMonth < 10) thisYM = String(thisYear) + thisYM + String(thisMonth);
    else thisYM = String(thisYear) + String(thisMonth);

    const insertReservationRow = await insertReservation(covers, date, time, table_id, name, phone_number);
    await updateNumOfPeople(thisYM, covers);
    await updateWeekday(thisYM, new Date(`${date}`).getDay());
    await updateNoShow(thisYM);
    await updateTotal(thisYM);

    if (insertReservationRow) {
        return res.send({
            isSuccess: true,
            code: 200,
            message: "예약 성공",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "예약 실패",
        });
    }
}
