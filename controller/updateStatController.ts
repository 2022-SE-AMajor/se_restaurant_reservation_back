const { updateStat } = require("../data/updateStat");
import { Request, Response } from "express";

export async function updating(req: Request, res: Response) {
    const { year_month, no_show, day, people } = req.body;
    //예약한 고객이 도착하거나 노쇼할 때 req.body가 그 예약에 해당하는 정보를 갖도록 하고 싶다.
    const updateRow = await updateStat(year_month, no_show, day, people);

    if (updateRow) {
        return res.send({
            result: updateRow,
            isSuccess: true,
            code: 557,
            message: "갱신 완료",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 57,
            message: "갱신 실패",
        });
    }
}
