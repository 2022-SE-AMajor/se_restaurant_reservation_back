import express  from 'express';
import cors from "cors";

import { login } from './controller/auth';
import { db } from './db/database';

const app = express();

app.use(express.json())
app.use(cors());

app.get('/login', login);

db.getConnection().then((connection:any)=>{
  console.log("MYSQL 연결완료");
})

app.listen(process.env.PORT||4000,()=>{
    console.log('4000번 포트에서 대기중');
}); 
app.get('/', (요청, 응답) => {
  응답.send('갔냐?');
});
app.post('/', (요청, 응답) => {
  응답.send('ok?');
});
app.post('/api/book/date', function(요청, 응답){
  const {date} =요청.body;
  console.log(date);
  if (date == "0502") {
    let data=[{
      이름: "김호진",
      시각: "15:00"
    },
    {
      이름: "김손님",
      시각: "16:00"
    }];
    응답.send(data);
  } else 응답.send("예약할 수 없는 날짜입니다.");
});
app.post('/api/list/table', function(요청, 응답){

  응답.send({
    result: db.query('select * from 식탁'),
    isSuccess: false,
    code:200,
    message: "데이터가 누락됐습니다."
  });

});
app.post('/api/modify/:date', function(요청, 응답){
  let {date} = 요청.params;

});