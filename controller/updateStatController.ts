/*const { updateStat } = require("../data/updateStat");
const { selectSpecificReservation } = require("../data/readData");
const { alreadyUpdated } = require("../data/updateData");
import { Request, Response } from "express";

export async function updatingStat(req: Request, res: Response) {
    //예약한 고객이 도착하거나 노쇼할 때 req.body가 그 예약에 해당하는 정보를 갖도록 하고 싶다.
    const { oid } = req.body;
    const thisYear = new Date().getFullYear(),
        thisMonth = new Date().getMonth() + 1;
    const today = `${thisYear}-${thisMonth}-${new Date().getDate()}`;
    let thisYM = `0`;
    if (thisMonth < 10) {
        thisYM = String(thisYear) + thisYM + String(thisMonth);
    } else {
        thisYM = String(thisYear) + String(thisMonth);
    }
    let updateRow = false;
    const timeRow = await selectSpecificReservation(oid);
    if (timeRow == "") {
        return res.send({
            isSuccess: true,
            code: 60,
            message: "선택한 oid의 예약이 없습니다.",
        });
    } else if (timeRow[0][`status`] < 0) {
        return res.send({
            isSuccess: false,
            code: 70,
            message: "이미 통계에 반영한 예약입니다.",
        });
    } else if (timeRow[0][`date`] < today) {
        return res.send({
            isSuccess: false,
            code: 70,
            message: "지난 날짜에 해당하는 예약입니다.",
        });
    } else {
        updateRow = await updateStat(thisYM, timeRow[0][`status`], timeRow[0][`day`], timeRow[0][`covers`]);
    }
    await alreadyUpdated(oid);

    if (updateRow) {
        return res.send({
            result: updateRow,
            isSuccess: true,
            code: 557,
            message: updateRow,
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 57,
            message: "갱신 실패",
        });
    }
}
*/
