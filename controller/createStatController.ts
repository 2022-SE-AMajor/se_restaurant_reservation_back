const { createStat } = require("../data/createStat");
import { Request, Response } from "express";

export async function insertStat(req: Request, res: Response) {
    const { year_month } = req.body;
    console.log(year_month);
    const createStatRow = await createStat(year_month);

    if (createStatRow) {
        return res.send({
            result: createStatRow,
            isSuccess: true,
            code: 200,
            message: "통계 생성 성공",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "통계 생성 실패",
        });
    }
}
