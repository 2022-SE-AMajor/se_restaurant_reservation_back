import express from "express";
import cors from "cors";

import { login } from "./controller/auth";
import { createReservation } from "./controller/insertController";
import { readReservation } from "./controller/readController";
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

const app = express();

app.use(express.json());
app.use(cors());

app.get("/login", login);
app.post("/reserve", createReservation);
app.get("/readReservation", readReservation);
app.post("/arrivetime", arriveTime);
app.put("/stat", insertStat);
app.patch("/stat", updating);
app.get("/stat", showStat);
app.get("/stat/abs", showNoShowStat);
app.get("/stat/day", showDayOfWeekStat);
app.get("/stat/num", showNumOfCustStat);
app.get("/stat/all", showAllStat);

app.listen(process.env.PORT || 4000, () => {
    console.log("4000번 포트에서 대기중");
});
