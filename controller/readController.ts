
const readData=require('../data/readData');
import { Request, Response } from 'express';

export async function readReservation(req: Request, res:Response){
    const selectRervationRow= await readData.selectReservation();
    // console.log(selectRervationRow);
    
    if(selectRervationRow) {
        return res.send({
            result: selectRervationRow,
            isSuccess: true,
            code: 200,
            message: "예약 조회 성공"
        })
    } else {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "예약 조회 실패"
        })
    }

};
// AM-34 test


