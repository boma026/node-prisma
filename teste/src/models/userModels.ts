import { prisma } from "../libs/prisma";
import { Prisma } from "../generated/prisma";

export const createUserModel = async (data: Prisma.UserCreateInput) => { // É um tipo TypeScript gerado automaticamente pelo Prisma com base no seu modelo User no schema.prisma.
        try{
        return await prisma.user.create({ data });
        }catch(e){
            return false
        }
}

export const createUsersModel = async (data:Prisma.UserCreateInput[]) => {
    try{
        return await prisma.create.many({
            data: [
                {data}

            ]
        })
    }
}