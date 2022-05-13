import * as userRepository from "../data/auth";

import { UserProps } from "../type";

import { Request, Response } from "express";

export async function login(req: Request, res: Response) {
    console.log("login", req.body);
    const { id, password } = req.body;
    const found: UserProps = await userRepository.findAdminById({ id });
    if (!found) {
        return res.status(400).json({ message: `가입되지 않은 회원입니다.` });
    }
    if (found.id === id && found.pw === password) {
        console.log(id);
        console.log(password);
        return res.json({ message: "success" });
    } else {
        return res.status(400).json({ message: `잘못된 비밀번호입니다.` });
    }
}
