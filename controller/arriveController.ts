// import { updateReservationArrived } from './../data/updateData';
import { Request, Response } from "express";

const arriveData = require("../data/arriveData");
const {findArriveTimeByOid} = require("../data/arriveData");
const {updateReservationArrived} = require("../data/updateData")
const { listRecord } = require("../data/listData");
const { selectCovAndTimeOfReservation } = require("../data/readData");
const { reverseNoShow } = require("../data/updateStat");
const { sListReservation } = require("../data/listData"); // import sListReservation
const { autoDeleteReservation } = require("../data/autoDeleteData"); // import autoDeleteReservation

export async function arriveTime(req: Request, res: Response) {
    console.log("table_id", req.body);
    const { table_id, date, time } = req.body;

    // const [a] = await sListReservation(); // select 현재 전체 예약 현황 **자동 삭제 참고할 부분

    console.log(table_id);

    const found = await arriveData.findArriveTime(table_id, date, time);
    console.log(found)
    // console.log(found[0][`table_id`]);
    if (found.length === 0) {
        return res.status(409).json({ message: `error` });
    }
    if (found[0][`table_id`] == table_id) {
        const oid = found[0][`oid`];
        console.log(oid);

        // const autoDeleteReservationRow = await autoDeleteReservation(a); // 갱신 **자동 삭제 참고할 부분

        // if (autoDeleteReservationRow) {
        //     console.log("자동 예약 삭제 성공");
        // } else {
        //     return res.send({
        //         isSuccess: false,
        //         code: 400,
        //         message: "시간 초과 자동 예약 삭제 실패",
        //     });
        // }
        console.log(oid)
        const arriveFound = await arriveData.insertArrival(oid);
        await updateReservationArrived(oid);

        // const arriveRecord = await listRecord(oid);
        // const compTime = await selectCovAndTimeOfReservation(oid);
        // const thisYear = new Date(compTime[0][`date`]).getFullYear(),
        //     thisMonth = new Date(compTime[0][`date`]).getMonth() + 1;
        // let thisYM = `0`;
        // if (thisMonth < 10) thisYM = String(thisYear) + thisYM + String(thisMonth);
        // else thisYM = String(thisYear) + String(thisMonth);
        // if (arriveRecord[arriveRecord.length - 1][`arrival_time`] <= compTime[0][`time`]) await reverseNoShow(thisYM);

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

export async function getArriveTime(req: Request, res: Response){
    const { oid } = req.params;

    const findArriveTimeRow = await findArriveTimeByOid(oid);

    if (findArriveTimeRow) {
        return res.send({
            result: findArriveTimeRow,
            isSuccess: true,
            code: 200,
            message: "도착기록 조회 성공",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "도착기록 조회 실패",
        });
    }

}