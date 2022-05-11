import express from "express";
import cors from "cors";

import { login } from "./controller/auth";
import { createReservation } from "./controller/insertController";
import { readReservation } from "./controller/readController";
import { showStat } from "./controller/readStatController";
import { insertStat } from "./controller/createStatController";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/login", login);
app.post("/reserve", createReservation);
app.get("/readReservation", readReservation);
app.get("/stat", showStat);
app.get("/stat/new", insertStat);

app.listen(process.env.PORT || 4000, () => {
    console.log("4000번 포트에서 대기중");
});

//예약하자
//TEST
//asdfasdf
//test
//test2
