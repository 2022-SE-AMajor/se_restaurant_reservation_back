import express from "express";
import cors from "cors";

import { login } from "./controller/auth";
import { createReservation } from "./controller/insertController";
import { readReservation } from "./controller/readController";
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

app.post("/login", login);
app.post("/reserve", createReservation);
app.post("/readReservation", readReservation);
//app.delete("/autoDelete", autodDeleteReservation);
app.delete("/delete", dDeleteReservation);
app.get("/list", listReservation);

app.post("/stat", showStat);
app.post("/stat/noshow", showNoShowStat);
app.post("/stat/day", showDayOfWeekStat);
app.post("/stat/num", showNumOfCustStat);
app.post("/stat/all", showAllStat);
app.post("/stat/new", insertStat);
app.post("/stat/update", updating);

app.listen(process.env.PORT || 4000, () => {
    console.log("4000번 포트에서 대기중");
});
