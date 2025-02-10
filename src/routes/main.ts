import { Router } from 'express';
import { createUser, getAllUsers, getUserByEmail } from '../services/user';
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
        name:"jarthur2",
        email:"gabrielfixe8@hotmail.com",
        posts: {
            create: {
                title: "titulo de teste",
                body: "corpo de teste"
            }
        }
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

mainRouter.get("/users", async (req, res) => {
    const result = await getAllUsers();
    res.json({ result })
})

mainRouter.get("/user", async (req, res) => {
    const result = await getUserByEmail("joao@hotmail.com");
    res.json({ result });
})