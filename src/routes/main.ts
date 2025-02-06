import { Router } from 'express';
import { createUser } from '../services/user';
import { createUsers } from '../services/user';

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.get('/', (req, res) => {
    res.json({ home: "home"});
});

mainRouter.post("/user", async (req, res) => {
    const user = await createUser({
        name:"arthur",
        email:"gabrielfixe@hotmail.com"
    })
    if(user) {
        res.json({ user });
    }
    else{
        res.status(500).json({error: "Ocorreu um erro"});
    }

})

mainRouter.post("/users", async (req, res) => {
    const result = await createUsers([
        { name: "João", email: "joao@hotmail.com"},
        { name: "joao 2", email: "joao@hotmail.com"}, //mesmo email
        { name: "fulano", email: "fulano@hotmail.com"},
        { name: "ciclano", email: "ciclano@hotmail.com"}
    ]);
    res.json({ count: result })
})