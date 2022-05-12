const { selectStats, allStats } = require("../data/statOfData");

import { Request, Response } from "express";
//선택한 달의 통계 선택
export async function showStat(req: Request, res: Response) {
    const { year_month } = req.body;
    const selectStatsRow = await selectStats(year_month);

    if (selectStatsRow) {
        return res.send({
            result: selectStatsRow,
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
//통계 전부 보여줌, 쓸모있을진 미지수
export async function showAllStat(req: Request, res: Response) {
    const allStatsRow = await allStats();

    if (allStatsRow) {
        return res.send({
            result: allStatsRow,
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
