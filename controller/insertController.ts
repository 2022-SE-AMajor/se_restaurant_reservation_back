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

    if (selectTableIdListRow.length == 0) {
        return res.send({
            isSuccess: true,
            code: 200,
            message: "예약할 자리가 없습니다.",
        });
    } else if (selectTableIdListRow) {
        return res.send({
            result: selectTableIdListRow,
            isSuccess: true,
            code: 200,
            message: "예약 할 수 있는 시간입니다.",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "에러: 예약할 수 있는 시간인지 확인할 수 없습니다.",
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
