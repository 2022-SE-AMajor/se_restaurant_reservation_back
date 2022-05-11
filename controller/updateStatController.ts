const { updateStat } = require("../data/updateStat");

import { Request, Response } from "express";
//선택한 달의 통계 선택
export async function updating(req: Request, res: Response) {
    const { year_month, no_show, day, people } = req.body;
    const updateRow = await updateStat(year_month, no_show, day, people);

    if (updateRow) {
        return res.send({
            result: updateRow,
            isSuccess: true,
            code: 200,
            message: "갱신 완료",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "갱신 실패",
        });
    }
}
