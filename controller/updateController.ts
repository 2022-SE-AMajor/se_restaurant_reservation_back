const { updateReservation } = require("../data/updateData");
const { selectAllReservation, selectTableIdList, selectDateTimeAndTableId } = require("../data/readData");
// import { ReservationProps } from "../type";
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
            code: 400,
            message: "에러: 현재 예약 리스트를 확인할 수 없습니다.",
        });
    }
}

export async function isValidDateTimeWhenUpdating(req: Request, res: Response) {
    const { year, month, date, time } = req.body;
    console.log(year, month, date, time);
    let now = new Date(); // 한국시간 기준 아님
    let dateTime = new Date(`${year}-${month}-${date}T${time}`); //한국시간 기준 아님
    console.log(now);
    console.log(dateTime);
    if (now > dateTime) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "에러: 지난 날짜입니다.",
        });
    }
    const selectTableIdListRow = await selectTableIdList(`${year}-${month}-${date}`, time);

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
            result: TableList,
            isSuccess: true,
            code: 200,
            message: "선택한 시간에 예약 가능한 테이블을 조회 했습니다.",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "에러: 선택한 시간에 예약 가능한 테이블을 조회 할 수 없습니다.",
        });
    }
}

export async function modifyReservation(req: Request, res: Response) {
    const { oid } = req.params;
    const { date, time } = req.query;
    const { covers, table_id, name, phone_number } = req.body;
    console.log(date, time);
    console.log(covers, table_id, name, phone_number);

    // 데이터 중복은 일어날 수 없어 주석 처리했음.
    // const selectRervationRow = await selectDateTimeAndTableId();

    // for (var i in selectRervationRow) {
    //     var row = selectRervationRow[i];
    //     if (row.date == date && row.time == time && row.table_id == table_id) {
    //         console.log("데이터중복됨");
    //         const html = `
    //             <!DOCTYPE html>
    //             <html>
    //             <head>
    //             <meta charset="UTF-8">
    //             <title>practice</title>
    //             </head>
    //             <body>
    //             <h1>데이터 중복됨!</h1>
    //             </body>
    //             </html>
    //             `; //front 메세지 창 html
    //         return res.send(html);
    //     }
    // }
    const updateReservationRow = await updateReservation(oid, covers, date, time, table_id, name, phone_number);

    if (updateReservationRow) {
        return res.send({
            result: {
                date: date,
                time: time,
                table_id: table_id,
            }, // 예약 날짜 확인 창을 위한 res.result
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
