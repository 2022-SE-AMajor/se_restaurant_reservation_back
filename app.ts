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

const app = express();

app.use(express.json());
app.use(cors());

app.post("/login", login);
app.post("/reserve", createReservation);
app.post("/readReservation", readReservation);

app.get("/stat", showStat);
app.get("/stat/noshow", showNoShowStat);
app.get("/stat/day", showDayOfWeekStat);
app.get("/stat/num", showNumOfCustStat);
app.get("/stat/all", showAllStat);
app.put("/stat/new", insertStat);
app.patch("/stat/update", updating);

app.listen(process.env.PORT || 4000, () => {
    console.log("4000번 포트에서 대기중");
});
