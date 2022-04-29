import * as userRepository from '../data/auth'

import {UserProps}from '../type'

import { Request, Response } from 'express';

export async function login(req:Request,res:Response) {
    console.log('login',req.body)
    const {id, password} = req.body;
    const found:UserProps = await userRepository.findUserById({id})
    if(!found) {
        return res.status(409).json({ message: `no id` });
    }
    if(found.id===id && found.password===password) {
        return res.json({message:"success"})
    } else{
        return res.status(409).json({ message: `wrong password` });
    }
}