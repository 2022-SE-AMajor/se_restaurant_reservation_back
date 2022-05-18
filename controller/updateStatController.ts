const { updateStat } = require("../data/updateStat");
const { selectReservation } = require("../data/readData");
import { Request, Response } from "express";

export async function updating(req: Request, res: Response) {
    //예약한 고객이 도착하거나 노쇼할 때 req.body가 그 예약에 해당하는 정보를 갖도록 하고 싶다.
    const thisYear = new Date().getFullYear(),
        thisMonth = new Date().getMonth() + 1;
    const today = `${thisYear}-${thisMonth}-${new Date().getDate()}`,
        time = `${new Date().getHours()}:${new Date().getMinutes()}`;
    let thisYM = `0`;
    if (thisMonth < 10) {
        thisYM = String(thisYear) + thisYM + String(thisMonth);
    } else {
        thisYM = String(thisYear) + String(thisMonth);
    }
    let updateRow = false;
    const timeRow = await selectReservation(today, time);
    console.log(timeRow);
    if (timeRow == "") {
        return res.send({
            isSuccess: true,
            code: 60,
            message: "갱신할 통계가 없습니다.",
        });
    } else {
        updateRow = await updateStat(thisYM, timeRow[0][`status`], timeRow[0][`day`], timeRow[0][`covers`]);
    }

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
