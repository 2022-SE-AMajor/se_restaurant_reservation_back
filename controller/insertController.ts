const { insertReservation } = require("../data/insertData");
const { selectDateTimeAndTableId } = require("../data/readData");
// import { ReservationProps } from "../type";
import { Request, Response } from "express";

export async function createReservation(req: Request, res: Response) {
    const { covers, date, time, table_id, name, phone_number } = req.body;
    console.log(covers, date, time, table_id, name, phone_number);
    const selectRervationRow = await selectDateTimeAndTableId();
    for (var i in selectRervationRow) {
        var row = selectRervationRow[i];
        if (row.date == date && row.time == time && row.table_id == table_id) {
            console.log("데이터중복됨");
            const html = ` 
                <!DOCTYPE html>
                <html>
                <head>
                <meta charset="UTF-8">
                <title>practice</title>
                </head>
                <body>
                <h1>데이터 중복됨!</h1>
                </body>
                </html>
                `; //front 메세지 창 html
            return res.send(html);
        }
    }
    const insertReservationRow = await insertReservation(covers, date, time, table_id, name, phone_number);

    if (insertReservationRow) {
        return res.send({
            isSuccess: true,
            code: 200,
            message: "예약 성공",
        });
    } else {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "예약 실패",
        });
    }
}

//testttttt
// const insertData= require("../data/insertData.js");

// exports.createReservation =async function(req, res){
//     const { covers, date, time, table_id, customer_id, arrival_time}=req.body;
//     console.log(covers, date, time, table_id, customer_id, arrival_time);

//     const insertReservationRow = await insertData.insertReservation(
//         covers,
//         date,
//         time,
//         table_id,
//         customer_id,
//         arrival_time
//     );

//     if(!insertReservationRow) {
//         return res.send({
//             isSuccess: false,
//             code: 400,
//             message: "예약 실패"
//         })
//     }
