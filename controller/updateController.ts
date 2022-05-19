const { updateReservation } = require("../data/updateData");
const { selectAllReservation, selectTableIdList, selectCovAndTimeOfReservation } = require("../data/readData");
const { updateNumOfPeople, reverseNumOfPeople, updateWeekday, reverseWeekday } = require("../data/updateStat");
import { Request, Response } from "express";

export async function viewAllReservaion(req: Request, res: Response) {
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
    const thisYear = new Date().getFullYear(),
        thisMonth = new Date().getMonth() + 1;
    let thisYM = `0`;
    if (thisMonth < 10) {
        thisYM = String(thisYear) + thisYM + String(thisMonth);
    } else {
        thisYM = String(thisYear) + String(thisMonth);
    }
    //date만으로 thisYM 구할 수 있으면 위의 변수와 식은 필요없음
    const lastReservationRow = await selectCovAndTimeOfReservation(oid);
    await reverseNumOfPeople(thisYM, lastReservationRow[0][`covers`]);
    //await reverseWeekday(thisYM, 기존요일);
    const updateReservationRow = await updateReservation(oid, covers, date, time, table_id, name, phone_number);
    await updateNumOfPeople(thisYM, covers);
    //await updateWeekday(thisYM, 새로운요일);
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
/*export async function decidingNoShow(req: Request, res: Response) {
    const { oid } = req.body;
    const now = `${new Date().getHours()}:${new Date().getMinutes()}`;
    let changeRow;
    const bookRow = await selectSpecificReservation(oid);
    if (bookRow == "") {
        return res.send({
            isSuccess: true,
            code: 160,
            message: "갱신할 예약이 없습니다.",
        });
    }
    console.log(bookRow, bookRow[0][`time`], now);
    if (bookRow[0][`status`] == -1) changeRow = "이미 통계에 반영한 예약이라 예약 상태를 바꿀 수 없습니다.";
    else if (bookRow[0][`time`] >= now) changeRow = await updateStatusShow(oid);
    else changeRow = await updateStatusNoShow(oid);
    console.log(oid, changeRow);

    if (changeRow) {
        return res.send({
            result: changeRow,
            isSuccess: true,
            code: 557,
            message: changeRow,
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 57,
            message: "갱신 실패",
        });
    }
}*/
