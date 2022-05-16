const listData = require("../data/listData");
import { Request, Response } from "express";

export async function listReservation(req: Request, res: Response) {
    const listRervationRow = await listData.listReservation();
    console.log(listRervationRow);

    if (listRervationRow) {
        return res.send({
            result: listRervationRow,
            isSuccess: true,
            code: 200,
            message: "예약 리스트 출력 성공",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "예약 리스트 출력 실패",
        });
    }
}
