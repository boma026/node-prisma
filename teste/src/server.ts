import express from "express";
import helmet from "helmet";
import { router } from "./routes/routes";

const server = express();
server.use(helmet());
server.use(express.json());
server.use("/", router);
server.listen(3001, () => {
    console.log("Servidor rodando na porta: http://localhost:3001");
})

//npm i -D prisma
//npx prisma init
//npx prisma migrate dev
//npx prisma db push