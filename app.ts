import express from "express";
import cors from "cors";

import { login } from "./controller/auth";
import { isValidDateTimeWhenCreating, createReservation } from "./controller/insertController";
import { isValidDateTimeWhenReading, readReservation } from "./controller/readController";
import { arriveTime } from "./controller/arriveController";
import {
    showStat,
    showNoShowStat,
    showDayOfWeekStat,
    showNumOfCustStat,
    showAllStat,
} from "./controller/readStatController";
import { insertStat } from "./controller/createStatController";
import { updating } from "./controller/updateStatController";
//import { autodDeleteReservation } from "./controller/autoDeleteController";
import { dDeleteReservation } from "./controller/deleteController";
import { listReservation } from "./controller/listController";

const app = express();

app.use(express.json());
app.use(cors());

//app.delete("/autoDelete", autodDeleteReservation);
app.delete("/delete", dDeleteReservation);
app.get("/list", listReservation);

app.get("/login", login);

app.get("/reserve", isValidDateTimeWhenCreating);
app.post("/reserve", createReservation);

app.get("/readReservation", isValidDateTimeWhenReading);
app.post("/readReservation", readReservation);

app.post("/arrivetime", arriveTime);
app.get("/stat", showStat);
app.get("/stat/abs", showNoShowStat);
app.get("/stat/day", showDayOfWeekStat);
app.get("/stat/num", showNumOfCustStat);
app.get("/stat/all", showAllStat);
app.put("/stat/new", insertStat);
app.patch("/stat/update", updating);

app.listen(process.env.PORT || 4000, () => {
    console.log("4000번 포트에서 대기중");
});
