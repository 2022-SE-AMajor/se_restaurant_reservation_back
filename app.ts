import express from "express";
import cors from "cors";
const morgan = require("morgan");

import { login } from "./controller/auth";
import { isValidDateTimeWhenCreating, createReservation } from "./controller/insertController";
import { readReservation } from "./controller/readController";
import {
    viewAllReservaion,
    isValidDateTimeWhenUpdating,
    modifyReservation,
    decidingNoShow,
} from "./controller/updateController";
import { ajaxOutPutTableList, createReservationOnSite } from "./controller/onSiteController";
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
import { autodDeleteReservation } from "./controller/autoDeleteController";
import { dDeleteReservation } from "./controller/deleteController";
import { listReservation } from "./controller/listController";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

app.post("/login", login);
app.post("/reserve", createReservation);
app.post("/readReservation", readReservation);
app.delete("/autoDelete", autodDeleteReservation);

app.delete("/delete", dDeleteReservation);
app.get("/list", listReservation);

app.get("/login", login);

app.get("/reserve", isValidDateTimeWhenCreating);
app.post("/reserve", createReservation);

app.get("/readReservation", readReservation);

app.get("/modifyReservation", viewAllReservaion);
app.get("/modifyReservation/:oid", isValidDateTimeWhenUpdating);
app.post("/modifyReservation/:oid", modifyReservation);
app.patch("/modifyReservation/abs", decidingNoShow);

app.get("/reserveOnSite", ajaxOutPutTableList);
app.post("/reserveOnSite", createReservationOnSite);

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
