const { deleteReservation } = require("../data/deleteData");
const { selectCovAndTimeOfReservation } = require("../data/readData");
const { reverseTotal, reverseNumOfPeople, reverseWeekday, reverseNoShow } = require("../data/updateStat");
// import { ReservationProps } from "../type";
import { Request, Response } from "express";

export async function dDeleteReservation(req: Request, res: Response) {
    const { oid } = req.body;
    console.log(oid);
    const lastReservationRow = await selectCovAndTimeOfReservation(oid);
    const thisYear = new Date(lastReservationRow[0][`date`]).getFullYear(),
        thisMonth = new Date(lastReservationRow[0][`date`]).getMonth() + 1;
    let thisYM = `0`;
    if (thisMonth < 10) thisYM = String(thisYear) + thisYM + String(thisMonth);
    else thisYM = String(thisYear) + String(thisMonth);
    await reverseNumOfPeople(thisYM, lastReservationRow[0][`covers`]);
    await reverseWeekday(thisYM, new Date(lastReservationRow[0][`date`]).getDay());
    await reverseNoShow(thisYM);
    await reverseTotal(thisYM);
    const deleteReservationRow = await deleteReservation(oid);

    if (deleteReservationRow) {
        return res.send({
            result: "예약 삭제 성공",
            isSuccess: true,
            code: 200,
            message: "예약 삭제 성공",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "예약 삭제 실패",
        });
    }
}
