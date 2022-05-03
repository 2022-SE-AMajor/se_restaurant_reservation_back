
const {insertReservation}=require('../data/insertData');
// import { ReservationProps } from "../type";
import { Request, Response } from 'express';

export async function createReservation(req: Request, res:Response){
    const { covers, date, time, table_id, customer_id, arrival_time}=req.body;
    console.log(covers, date, time, table_id, customer_id, arrival_time);

    const insertReservationRow = await insertReservation(
        covers,
        date,
        time,
        table_id,
        customer_id,
        arrival_time
    );
    
    if(insertReservationRow) {
        return res.send({
            isSuccess: true,
            code: 200,
            message: "예약 성공"
        })
    } else {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "예약 실패"
        })
    }

};

//testtt
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

// };