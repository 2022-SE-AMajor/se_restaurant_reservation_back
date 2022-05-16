const { insertReservation } = require("../data/insertData");
const { selectTableIdList, selectDateTimeAndTableId } = require("../data/readData");
// import { ReservationProps } from "../type";
import { Request, Response } from "express";

export async function isValidDateTimeWhenCreating(req: Request, res: Response) {
    const { year, month, date, time } = req.body;
    console.log(year, month, date, time);
    let now = new Date(); // 한국시간 기준 아님
    let dateTime = new Date(`${year}-${month}-${date}T${time}`); //한국시간 기준 아님
    console.log(now);
    console.log(dateTime);
    if (now > dateTime) {
        console.log("에러: 지난 날짜입니다.");
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

export async function createReservation(req: Request, res: Response) {
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
    const insertReservationRow = await insertReservation(covers, date, time, table_id, name, phone_number);

    if (insertReservationRow) {
        return res.send({
            result: {
                date: date,
                time: time,
                table_id: table_id,
            }, // 예약 날짜 확인 창을 위한 res.result
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

export async function createReservationOnSite(req: Request, res: Response) {
    const { date, time } = req.query; // 시간은 정각으로 고정해야 피그마에 맞다.
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
    const insertReservationRow = await insertReservation(covers, date, time, table_id, name, phone_number);

    if (insertReservationRow) {
        return res.send({
            result: {
                date: date,
                time: time,
                table_id: table_id,
            }, // 예약 날짜 확인 창을 위한 res.result
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
