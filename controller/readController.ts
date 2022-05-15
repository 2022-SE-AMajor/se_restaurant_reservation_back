const { selectTableIdList, selectReservation } = require("../data/readData");
import { Request, Response } from "express";

export async function isValidDateTimeWhenReading(req: Request, res: Response) {
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

    if (selectTableIdListRow) {
        return res.send({
            result: selectTableIdListRow,
            isSuccess: true,
            code: 200,
            message: "선택한 시간에 테이블리스트를 조회 했습니다.",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "에러: 선택한 시간에 테이블리스트를 조회 할 수 없습니다.",
        });
    }
}

export async function readReservation(req: Request, res: Response) {
    const { date, time } = req.query;
    console.log(date, time);
    const selectRervationRow = await selectReservation(date, time);
    // console.log(selectRervationRow);

    if (selectRervationRow) {
        return res.send({
            result: selectRervationRow,
            isSuccess: true,
            code: 200,
            message: "선택한 시간에 예약정보를 조회했습니다.",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "에러: 선택한 시간에 예약정보를 조회할 수 없습니다.",
        });
    }
}
