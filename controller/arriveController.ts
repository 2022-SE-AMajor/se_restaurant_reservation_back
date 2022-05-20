import { Request, Response } from "express";

const arriveData = require("../data/arriveData");

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
