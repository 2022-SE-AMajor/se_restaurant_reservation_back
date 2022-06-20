const { updateReservation } = require("../data/updateData");
const { selectAllReservation, selectTableIdList, selectCovAndTimeOfReservation } = require("../data/readData");
//const { sListReservation } = require("../data/listData"); // import sListReservation **자동 삭제 참고할 부분
//const { autoDeleteReservation } = require("../data/autoDeleteData"); // import autoDeleteReservation **자동 삭제 참고할 부분
const {
    updateTotal,
    reverseTotal,
    updateNumOfPeople,
    reverseNumOfPeople,
    updateWeekday,
    reverseWeekday,
} = require("../data/updateStat");

import { Request, Response } from "express";

export async function viewAllReservaion(req: Request, res: Response) {
    /*const [a] = await sListReservation(); // select 현재 전체 예약 현황 **자동 삭제 참고할 부분
    const autoDeleteReservationRow = await autoDeleteReservation(a); // 갱신 **자동 삭제 참고할 부분

    if (autoDeleteReservationRow) {
        console.log("자동 예약 삭제 성공");
    } else {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "시간 초과 자동 예약 삭제 실패",
        });
    }*/
    const selectAllReservationRow = await selectAllReservation();
    if (selectAllReservationRow) {
        return res.send({
            result: selectAllReservationRow,
            isSuccess: true,
            code: 200,
            message: "현재 예약 리스트를 확인했습니다.",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 404,
            message: "에러: 현재 예약 리스트를 확인할 수 없습니다.",
        });
    }
}

export async function isValidDateTimeWhenUpdating(req: Request, res: Response) {
    const { year, month, date, time } = req.body;
    const selectedDate = `${year}-${month}-${date}`;
    let now = new Date(); // 한국시간 기준 아님
    let dateTime = new Date(`${selectedDate}T${time}`); //한국시간 기준 아님

    if (now > dateTime) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "에러: 지난 날짜입니다.",
        });
    }
    /*const [a] = await sListReservation(); // select 현재 전체 예약 현황 **자동 삭제 참고할 부분
    const autoDeleteReservationRow = await autoDeleteReservation(a); // 갱신 **자동 삭제 참고할 부분

    if (autoDeleteReservationRow) {
        console.log("자동 예약 삭제 성공");
    } else {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "시간 초과 자동 예약 삭제 실패",
        });
    }*/
    const selectTableIdListRow = await selectTableIdList(selectedDate, time);

    let TableList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    for (var i = 0; i < selectTableIdListRow.length; i++) {
        delete TableList[selectTableIdListRow[i].table_id - 1];
    }

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

export async function modifyReservation(req: Request, res: Response) {
    const { oid } = req.params;
    const { date, time } = req.query;
    const { covers, table_id, name, phone_number } = req.body;
    // console.log(date, time);
    // console.log(covers, table_id, name, phone_number);

    /*const [a] = await sListReservation(); // select 현재 전체 예약 현황 **자동 삭제 참고할 부분
    const autoDeleteReservationRow = await autoDeleteReservation(a); // 갱신 **자동 삭제 참고할 부분

    if (autoDeleteReservationRow) {
        console.log("자동 예약 삭제 성공");
    } else {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "시간 초과 자동 예약 삭제 실패",
        });
    }*/

    const lastReservationRow = await selectCovAndTimeOfReservation(oid);
    const lastYear = new Date(lastReservationRow[0][`date`]).getFullYear(),
        lastMonth = new Date(lastReservationRow[0][`date`]).getMonth() + 1;
    let lastYM = `0`;
    if (lastMonth < 10) lastYM = String(lastYear) + lastYM + String(lastMonth);
    else lastYM = String(lastYear) + String(lastMonth);
    await reverseNumOfPeople(lastYM, lastReservationRow[0][`covers`]);
    await reverseWeekday(lastYM, new Date(lastReservationRow[0][`date`]).getDay());
    await reverseTotal(lastYM);
    const updateReservationRow = await updateReservation(oid, covers, date, time, table_id, name, phone_number);
    const thisYear = new Date(`${date}`).getFullYear(),
        thisMonth = new Date(`${date}`).getMonth() + 1;
    let thisYM = `0`;
    if (thisMonth < 10) thisYM = String(thisYear) + thisYM + String(thisMonth);
    else thisYM = String(thisYear) + String(thisMonth);
    await updateNumOfPeople(thisYM, covers);
    await updateWeekday(thisYM, new Date(`${date}`).getDay());
    await updateTotal(thisYM);
    if (updateReservationRow) {
        return res.send({
            isSuccess: true,
            code: 200,
            message: "예약 수정을 성공했습니다.",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "에러: 예약 수정을 실패했습니다.",
        });
    }
}
