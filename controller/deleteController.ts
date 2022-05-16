const { deleteReservation } = require("../data/deleteData");
// import { ReservationProps } from "../type";
import { Request, Response } from "express";

export async function dDeleteReservation(req: Request, res: Response) {
    const { oid } = req.body;
    console.log(oid);

    const deleteReservationRow = await deleteReservation(oid);

    if (deleteReservationRow) {
        return res.send({
            result: "예약 삭제 성공",
            isSuccess: true,
            code: 200,
            message: "예약 삭제 성공",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "예약 삭제 실패",
        });
    }
}
