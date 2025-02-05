import { Router } from 'express';
import { prisma } from '../libs/prisma';

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.get("/user", async (req, res) => {
    const user = await prisma.user.create({
        data: {
            name: "Boma",
            email: "arthurboma@yahoo.com.br"
        }
    });

    res.json({ user });
})