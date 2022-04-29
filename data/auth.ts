import { db } from "../db/database";

const users = [
    {
        id:'admin',
        password:'admin',
    }
]

//DB연결 없이 사용되는 임시 사용코드
export async function findUserById(user:any){
    const {id} = user
    const result = users.filter( user=> user.id === id)
    return result[0]
}

//DB연결 시 사용될 코드
// export async function findUserById(user:any){
//     const {id } = user
//     return db.execute('SELECT * from users where id=?',
//     [id]).then((result:any)=>{
//         // console.log(result);
//         return result[0][0];
//     })
// }