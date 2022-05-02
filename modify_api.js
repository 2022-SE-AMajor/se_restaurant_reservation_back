const express=require('express');
//const { send } = require('process');
const app=express();
app.use(express.json());

const server=app.listen(process.env.PORT||4000, function(){
    console.log('listening on 4000')
});
//테스트용 5월 2일 예약 현황
let data=[{
  이름: "김호진",
  시각: "15:00"
},
{
  이름: "김손님",
  시각: "16:00"
}];
app.get('/', (요청, 응답) => {
  응답.send('예약 앱 기본 화면');
});
app.post('/', (요청, 응답) => {
  응답.send('예약 앱 기본 화면');
});
//0부터 시작하는 n번째 고객의 신규 예약 정보 등록
app.post('/api/book/n/newcus', function(요청, 응답){
    const {n, newcus} =요청.body;
    if (n != "0" && n != "1") {
      data[n]=newcus;
      응답.send(data);
    } else 응답.send("예약할 수 없는 날짜입니다.");
});
//5월 2일의 예약 목록 조회
app.post('/api/list/date', function(요청, 응답){
  const {date} =요청.body;
    //console.log(date);
    if (date == "0502") {
      응답.send(data);
    } else 응답.send("예약 현황이 없는 날짜입니다.");
});
//n번째 고객의 이름, 예약 시간 변경(예약 수보다 큰 수 혹은 수가 아닌 n을 넣으면 수정할 수 없어야함)
app.post('/api/modify/n/name/time', function(요청, 응답){
  let {n, name, time} = 요청.body;

  if (n == "0" || n == "1") {
    data[n].이름=name;
    data[n].시각=time;
    응답.send(data);
  } else 응답.send("예약 현황이 없는 번호입니다.");
});