import express from "express";
import { createUserModel, createUsersModel, deleteUserModel, getAllUsers, getAllUsersYahoo, getUserByEmail, getUserByFilterTest, getUsersByPostTitle, updateOrCreateUserModel, updateUser, updateUsers } from "../models/userModels";

export const router = express.Router();

router.get("/ping", (req,res) => {
    res.json({pong: true});
});

//CREATE

router.post("/user", async (req, res) => {
    const user = await createUserModel({
            name: "Bomao",
            email: "bomao7@yahoo.com.br",
            //criando um post de teste assim que criado o usuario
            post:{
                create: {
                    title:"teste",
                    body: "testeBody"
                }
            }
        }
    );
    if(user)
        res.status(201).json({user});
    else{
        res.status(500).json({error: "Email ja cadastrado!"})
    }
})

router.post("/user/upsert", async (req, res) => {
    const user = await updateOrCreateUserModel({
            name: "Bomao",
            email: "bomao7@yahoo.com.br",
            //criando um post de teste assim que criado o usuario
            post:{
                create: {
                    title:"teste",
                    body: "testeBody"
                }
            }
        }
    );
    if(user)
        res.status(201).json({user});
    else{
        res.status(500).json({error: "Email ja cadastrado!"})
    }
})

router.post("/users", async (req, res) => {
    const user = await createUsersModel(
        [
            {name: "Bomao", email: "skeete3@outlook.com.br"},
            {name: "Bomao", email: "skeete3@outlook.com.br"},
            {name: "Bomao", email: "skeete4@outlook.com.br"},
            {name: "Bomao", email: "skeete5@outlook.com.br"},
            {name: "Bomao", email: "skeete6@outlook.com.br"}
        ]
    );
    if(user)
        res.status(201).json({ user }); // como esta usando o createmany o user retorna a quantidade de registro criados
    else{
        res.status(500).json({error: "Email ja cadastrado!"})
    }
})

//READ

router.get("/users", async (req,res) => {
    const users = await getAllUsers();
    res.status(200).json({ users });
})

router.get("/users/email", async (req,res) => {
    const users = await getAllUsersYahoo();
    res.status(200).json({ users });
})

router.get("/user", async (req,res) => {
    const users = await getUserByEmail("bomao6@yahoo.com.br");
    res.status(200).json({ users });
})

router.get("/user/test", async (req,res) => {
    const users = await getUserByFilterTest();
    res.status(200).json({ users });
})

router.get("/user/post/title", async (req,res) => {
    const users = await getUsersByPostTitle();
    res.status(200).json({ users });
})

//UPDATE

router.put("/user", async (req,res) => {
    const user = await updateUser("bomao2@yahoo.com.br");
    res.status(200).json(user);
})

router.put("/users", async (req,res) => {
    const users = await updateUsers();
    res.status(200).json({users});
})

//DELETE

router.delete("/user", async (req,res) => {
    const user = await deleteUserModel("bomao2@yahoo.com.br");
    res.status(200).json({deletedUser: user});
})
