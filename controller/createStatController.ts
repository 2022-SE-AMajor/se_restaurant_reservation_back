const thisMonthStat = require("../data/createStat");
import { Request, Response } from "express";

export async function insertStat(req: Request, res: Response) {
    const createStat = await thisMonthStat.createStat(202207);

    if (createStat) {
        return res.send({
            result: createStat,
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
