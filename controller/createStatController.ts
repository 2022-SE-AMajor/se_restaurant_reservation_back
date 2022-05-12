const { createStat } = require("../data/createStat");
import { Request, Response } from "express";

export async function insertStat(req: Request, res: Response) {
    const { year_month, date } = req.body;
    console.log(year_month, date);
    if (date != 1) {
        return res.send(`오늘은 생성할 수 없습니다.`);
    }
    //테스트하려고 넣은 조건문, 1일일 때만 알아서 생성했으면 좋겠는데
    //테스트 결과 년도가 0으로 끝나면 년과 달 문자열을 합쳐도 6자리 수가 아닌 4~5자리 수가 나옴.
    //데이터 속성을 date로 변경해야하나
    const createStatRow = await createStat(year_month);

    if (createStatRow) {
        return res.send({
            result: createStatRow,
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
