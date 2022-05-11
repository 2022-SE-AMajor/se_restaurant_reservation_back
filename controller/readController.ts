const { selectReservation } = require("../data/readData");
import { Request, Response } from "express";

export async function readReservation(req: Request, res: Response) {
    const { year, month, date, time } = req.body;
    console.log(year, month, date, time);
    const selectedDate = year + "-" + month + "-" + date;
    const selectedTime = time;
    let now = new Date(); // 한국시간 기준 아님
    let dateTime = new Date(year + "-" + month + "-" + date + "T" + time); //한국시간 기준 아님
    console.log(now);
    console.log(dateTime);
    if (now > dateTime) {
        console.log("에러: 지난 날짜");
        const html = ` 
            <!DOCTYPE html>
            <html>
            <head>
            <meta charset="UTF-8">
            <title>practice</title>
            </head>
            <body>
            <h1>에러: 지난날짜</h1>
            </body>
            </html>
            `; //front 메세지 창 html
        return res.send(html);
    }

    const selectRervationRow = await selectReservation(selectedDate, selectedTime);
    // console.log(selectRervationRow);

    if (selectRervationRow) {
        return res.send({
            result: selectRervationRow,
            isSuccess: true,
            code: 200,
            message: "예약 조회 성공",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "예약 조회 실패",
        });
    }
}
