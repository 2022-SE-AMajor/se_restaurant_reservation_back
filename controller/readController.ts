const { selectReservation } = require("../data/readData");
import { Request, Response } from "express";

export async function readReservation(req: Request, res: Response) {
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

    const selectRervationRow = await selectReservation(selectedDate, time);
    // console.log(selectRervationRow);

    if (selectRervationRow) {
        selectRervationRow.push({
            date: selectedDate,
            time: time,
        });
        return res.send({
            result: selectRervationRow,
            isSuccess: true,
            code: 200,
            message: "선택한 시간에 예약정보를 조회했습니다.",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 404,
            message: "에러: DB 연동 비정상",
        });
    }
}
