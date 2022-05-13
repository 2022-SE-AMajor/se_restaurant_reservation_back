const {
    selectStats,
    selectNoShowStats,
    selectDayOfWeekStats,
    selectNumOfCustStats,
    allStats,
} = require("../data/statOfData");

import { Request, Response } from "express";
//선택한 달의 통계 선택
export async function showStat(req: Request, res: Response) {
    const { year_month } = req.body;
    const selected = await selectStats(year_month);

    if (selected) {
        return res.send({
            result: selected,
            isSuccess: true,
            code: 552,
            message: "통계 조회 성공",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 52,
            message: "통계 조회 실패",
        });
    }
}
export async function showNoShowStat(req: Request, res: Response) {
    const { year_month } = req.body;
    const noShow = await selectNoShowStats(year_month);

    if (noShow) {
        return res.send({
            result: noShow,
            isSuccess: true,
            code: 553,
            message: "노쇼 통계 조회 성공",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 53,
            message: "노쇼 통계 조회 실패",
        });
    }
}
export async function showDayOfWeekStat(req: Request, res: Response) {
    const { year_month } = req.body;
    const dayOfWeek = await selectDayOfWeekStats(year_month);

    if (dayOfWeek) {
        return res.send({
            result: dayOfWeek,
            isSuccess: true,
            code: 554,
            message: "요일별 통계 조회 성공",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 54,
            message: "요일별 통계 조회 실패",
        });
    }
}
export async function showNumOfCustStat(req: Request, res: Response) {
    const { year_month } = req.body;
    const numOfCust = await selectNumOfCustStats(year_month);
    //let count = [];
    console.log(numOfCust[0][`oneC`]);
    //count[0]=numOfCust.oneC;

    if (numOfCust) {
        return res.send({
            result: numOfCust,
            isSuccess: true,
            code: 555,
            message: "인원별 통계 조회 성공",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 55,
            message: "인원별 통계 조회 실패",
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
            code: 556,
            message: "통계 조회 성공",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 56,
            message: "통계 조회 실패",
        });
    }
}
