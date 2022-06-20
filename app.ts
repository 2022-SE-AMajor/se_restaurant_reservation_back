import express from "express";
import cors from "cors";
const morgan = require("morgan");

import { login } from "./controller/auth";
import { isValidDateTimeWhenCreating, createReservation } from "./controller/insertController";
import { readReservation } from "./controller/readController";
import { viewAllReservaion, isValidDateTimeWhenUpdating, modifyReservation } from "./controller/updateController";
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
import { autodDeleteReservation } from "./controller/autoDeleteController";
import { dDeleteReservation } from "./controller/deleteController";
import { listReservation } from "./controller/listController";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

app.post("/login", login);
app.post("/reserve", createReservation); //중복a
app.post("/readReservation", readReservation); //중복b
//app.delete("/autoDelete", autodDeleteReservation); //이제 없어도 됨
app.delete("/delete", dDeleteReservation);
app.get("/list", listReservation);

app.get("/login", login);

app.get("/reserve", isValidDateTimeWhenCreating);
app.post("/reserve", createReservation); //중복a

app.get("/readReservation", readReservation); //중복b

app.get("/modifyReservation", viewAllReservaion);
app.get("/modifyReservation/:oid", isValidDateTimeWhenUpdating);
app.post("/modifyReservation/:oid", modifyReservation);

app.get("/reserveOnSite", ajaxOutPutTableList);
app.post("/reserveOnSite", createReservationOnSite);

app.post("/arrivetime", arriveTime);
app.put("/login", insertStat);
app.get("/stat", showStat);
app.get("/stat/abs", showNoShowStat);
app.get("/stat/day", showDayOfWeekStat);
app.get("/stat/num", showNumOfCustStat);
app.get("/stat/all", showAllStat);

app.listen(process.env.PORT || 4000, () => {
    console.log("4000번 포트에서 대기중");
});
