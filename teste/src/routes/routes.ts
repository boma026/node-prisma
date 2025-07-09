import express from "express";
import { createUserModel, createUsersModel } from "../models/userModels";

export const router = express.Router();

router.get("/ping", (req,res) => {
    res.json({pong: true});
});

router.post("/user", async (req, res) => {
    const user = await createUserModel({
            name: "Bomao",
            email: "bomao2@yahoo.com.br"
        }
    );
    if(user)
        res.status(201).json({user});
    else{
        res.status(500).json({error: "Email ja cadastrado!"})
    }
})

router.post("/users", async (req, res) => {
    const user = await createUsersModel/([
            name: "Bomao",
            email: "bomao2@yahoo.com.br"
    ]
    );
    if(user)
        res.status(201).json({user});
    else{
        res.status(500).json({error: "Email ja cadastrado!"})
    }
})