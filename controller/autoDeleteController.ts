const { autoDeleteReservation } = require("../data/autoDeleteData");
const { sListReservation } = require("../data/listData");
// import { ReservationProps } from "../type";
import { Request, Response } from "express";

export async function autodDeleteReservation(req: Request, res: Response) {
    const [a] = await sListReservation(); //oid, date, time 형태 반환받음
    //console.log(a);

    const autoDeleteReservationRow = await autoDeleteReservation(a);

    if (true) {
        return res.send({
            result: "시간 초과 자동 예약 삭제 성공",
            isSuccess: true,
            code: 200,
            message: "시간 초과 자동 예약 삭제 성공",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "시간 초과 자동 예약 삭제 실패",
        });
    }
}
