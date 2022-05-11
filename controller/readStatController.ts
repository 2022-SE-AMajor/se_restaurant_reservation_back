const readStat = require("../data/statOfData");
import { Request, Response } from "express";

export async function showStat(req: Request, res: Response) {
    const selectStats = await readStat.selectStats();

    if (selectStats) {
        return res.send({
            result: selectStats,
            isSuccess: true,
            code: 200,
            message: "통계 조회 성공",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "통계 조회 실패",
        });
    }
}
