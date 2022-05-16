const { createStat } = require("../data/createStat");
import { Request, Response } from "express";

export async function insertStat(req: Request, res: Response) {
    const createStatRow = await createStat();

    if (createStatRow) {
        return res.send({
            result: createStatRow,
            isSuccess: true,
            code: 551,
            message: createStatRow,
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 51,
            message: "통계를 가져오고 있습니다.",
        });
    }
}
