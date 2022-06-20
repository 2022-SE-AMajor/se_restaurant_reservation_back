const {
    selectStats,
    selectNoShowStats,
    selectDayOfWeekStats,
    selectNumOfCustStats,
    allStats,
} = require("../data/statOfData");

import { Request, Response } from "express";

export async function showStat(req: Request, res: Response) {
    const { year_month } = req.body;
    const selected = await selectStats(year_month);
    if (selected == "") {
        return res.send({
            result: selected,
            isSuccess: false,
            code: 49,
            message: "선택한 달의 통계가 없습니다.",
        });
    } else if (selected[0][`month_total`] == 0) {
        return res.send({
            result: selected,
            isSuccess: false,
            code: 50,
            message: "선택한 달의 정보가 충분하지 않습니다.",
        });
    } else if (selected) {
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
    if (noShow == "" || noShow[`thisRow`] == "") {
        return res.send({
            result: noShow,
            isSuccess: false,
            code: 49,
            message: "선택한 달의 통계가 없습니다.",
        });
    }

    const this_total = noShow[`thisRow`][0][`month_total`];
    if (this_total == 0) {
        return res.send({
            result: noShow,
            isSuccess: false,
            code: 50,
            message: "선택한 달의 정보가 충분하지 않습니다.",
        });
    }

    const this_noShow = noShow[`thisRow`][0][`no_show`],
        this_rate = (this_noShow / this_total) * 100;
    if (noShow[`lastRow`] == "") {
        let last_empty = "저번 달의 통계는 없습니다.";
        return res.send({
            result: { this_total, this_noShow, this_rate, last_empty },
            isSuccess: true,
            code: 553,
            message: "노쇼 통계 조회 성공",
        });
    }

    const last_total = noShow[`lastRow`][0][`month_total`],
        last_noshow = noShow[`lastRow`][0][`no_show`];
    let last_rate = 0,
        comp_rate = 0;
    if (last_total != 0) (last_rate = (last_noshow / last_total) * 100), (comp_rate = this_rate - last_rate);

    if (noShow) {
        return res.send({
            result: { this_total, this_noShow, this_rate, comp_rate },
            isSuccess: true,
            code: 553,
            message: "노쇼 통계 조회 성공",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 52,
            message: "통계 조회 실패",
        });
    }
}
export async function showDayOfWeekStat(req: Request, res: Response) {
    const { year_month } = req.body;
    const dayOfWeek = await selectDayOfWeekStats(year_month);
    if (dayOfWeek == "") {
        return res.send({
            result: dayOfWeek,
            isSuccess: false,
            code: 49,
            message: "선택한 달의 통계가 없습니다.",
        });
    } else if (dayOfWeek[0][`month_total`] == 0) {
        return res.send({
            result: dayOfWeek,
            isSuccess: false,
            code: 50,
            message: "선택한 달의 정보가 충분하지 않습니다.",
        });
    } else if (dayOfWeek) {
        return res.send({
            result: dayOfWeek,
            isSuccess: true,
            code: 554,
            message: "요일별 통계 조회 성공",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 52,
            message: "통계 조회 실패",
        });
    }
}
export async function showNumOfCustStat(req: Request, res: Response) {
    const { year_month } = req.body;
    const numOfCust = await selectNumOfCustStats(year_month);
    if (numOfCust == "") {
        return res.send({
            result: numOfCust,
            isSuccess: false,
            code: 49,
            message: "선택한 달의 통계가 없습니다.",
        });
    }
    const total = numOfCust[0][`month_total`];
    if (total == 0) {
        return res.send({
            isSuccess: false,
            code: 50,
            message: "선택한 달의 정보가 충분하지 않습니다.",
        });
    }
    let avg = 0,
        Eng = [`one`, `two`, `three`, `four`, `five`, `six`, `seven`, `eight`];
    for (let i = 0; i < 8; i++) {
        let num = Eng[i] + `C`;
        avg += numOfCust[0][num] * (i + 1);
    }
    avg /= total;

    if (numOfCust) {
        return res.send({
            result: { numOfCust, avg },
            isSuccess: true,
            code: 555,
            message: "인원별 통계 조회 성공",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 52,
            message: "통계 조회 실패",
        });
    }
}
export async function showAllStat(req: Request, res: Response) {
    const allStatsRow = await allStats();
    if (allStatsRow) {
        return res.send({
            result: allStatsRow,
            isSuccess: true,
            code: 556,
            message: "모든 통계 조회 성공",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 52,
            message: "통계 조회 실패",
        });
    }
}
