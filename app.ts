import express from "express";
import cors from "cors";

import { login } from "./controller/auth";
import { createReservation } from "./controller/insertController";
import { readReservation } from "./controller/readController";
import { arriveTime } from "./controller/arriveController";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/login", login);
app.post("/reserve", createReservation);
app.get("/readReservation", readReservation);
app.post("/arrivetime", arriveTime);

app.listen(process.env.PORT || 4000, () => {
    console.log("4000번 포트에서 대기중");
}); //test
