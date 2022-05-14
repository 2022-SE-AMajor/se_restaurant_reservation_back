const { createStat } = require("../data/createStat");
import { Request, Response } from "express";

export async function insertStat(req: Request, res: Response) {
    const createStatRow = await createStat();

    if (createStatRow) {
        return res.send({
            result: createStatRow,
            isSuccess: true,
            code: 551,
            message: "통계 생성 성공",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 51,
            message: "통계 생성 실패",
        });
    }
}
