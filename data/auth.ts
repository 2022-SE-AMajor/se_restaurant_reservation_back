import { db } from "../db/database";

const { pool } = require("../db/database");

const users = [
    {
        id: "admin",
        password: "admin",
    },
];

const ReservationUsers = [
    {
        customer_id: "abc11",
        date: "2020-11-20",
        time: "18:06",
    },
];

//DB연결 없이 사용되는 임시 사용코드
//export async function findAdminById(user: any) {
//    const { id } = user;
//    const result = users.filter((user) => user.id === id);
//    return result[0];
//}

//DB연결 시 사용될 코드
//export async function findUserById(id: any, password: any) {
//    console.log(id);
//    console.log(password);
//    return db.execute("SELECT * from user where id=? and pw=?", [id, password]).then((result: any) => {
//        console.log(result[0][0]);
//        return result[0][0];
//    });
//}
//DB연결 시 사용될 코드
export async function findAdminById(user: any) {
    const { id } = user;
    return db.execute("SELECT * from user where id=?", [id]).then((result: any) => {
        return result[0][0];
    });
}
