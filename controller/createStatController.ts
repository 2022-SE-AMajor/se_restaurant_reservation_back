const { createStat } = require("../data/createStat");
import { Request, Response } from "express";

export async function insertStat(req: Request, res: Response) {
    let thisYear = new Date().getFullYear(),
        thisMonth = new Date().getMonth() + 1;
    let thisYM = `0`;
    if (thisMonth < 10) thisYM = String(thisYear) + thisYM + String(thisMonth);
    else thisYM = String(thisYear) + String(thisMonth);
    await createStat(thisYM);

    thisMonth++;
    if (thisMonth > 12) {
        thisYear++;
        thisMonth = 1;
    }
    if (thisMonth < 10) thisYM = String(thisYear) + `0` + String(thisMonth);
    else thisYM = String(thisYear) + String(thisMonth);
    await createStat(thisYM);

    thisMonth++;
    if (thisMonth > 12) {
        thisYear++;
        thisMonth = 1;
    }
    if (thisMonth < 10) thisYM = String(thisYear) + `0` + String(thisMonth);
    else thisYM = String(thisYear) + String(thisMonth);
    const createStatRow = await createStat(thisYM);

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
