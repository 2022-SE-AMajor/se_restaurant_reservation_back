const arriveData = require("../data/arriveData");
const { listRecord } = require("../data/listData");
const { selectCovAndTimeOfReservation } = require("../data/readData");
const { reverseNoShow } = require("../data/updateStat");
import { Request, Response } from "express";

export async function arriveTime(req: Request, res: Response) {
    console.log("table_id", req.body);
    const { table_id } = req.body;
    console.log(table_id);
    //const found: UserArrive = await findArriveTime({ oid });
    const found = await arriveData.findArriveTime(table_id);
    console.log(found[0][`table_id`]);
    if (!found) {
        return res.status(409).json({ message: `error` });
    }
    if (found[0][`table_id`] == table_id) {
        const oid = found[0][`oid`];
        console.log(oid);
        const arriveFound = await arriveData.insertArrival(oid);
        const arriveRecord = await listRecord(oid);
        const compTime = await selectCovAndTimeOfReservation(oid);
        const thisYear = new Date().getFullYear(),
            thisMonth = new Date().getMonth() + 1;
        let thisYM = `0`;
        if (thisMonth < 10) thisYM = String(thisYear) + thisYM + String(thisMonth);
        else thisYM = String(thisYear) + String(thisMonth);
        if (arriveRecord[arriveRecord.length - 1][`arrival_time`] <= compTime[0][`time`]) await reverseNoShow(thisYM);

        if (arriveFound) {
            return res.send({
                isSuccess: true,
                code: 200,
                message: "도착시간 기록 성공",
            });
        } else {
            return res.send({
                isSuccess: false,
                code: 400,
                message: "도착시간 기록 실패",
            });
        }
    } else {
        return res.status(409).json({ message: `해당 테이블은 예약이 없습니다.` });
    }
}
