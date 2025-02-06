import { skip } from "node:test";
import { prisma } from "../libs/prisma"
import { Prisma } from "@prisma/client"


export const createUser = async (data: Prisma.UserCreateInput ) => {
    try{
        return await prisma.user.create({ data });
    } catch (error){
        return false;
    }
}

export const createUsers = async (users: Prisma.UserCreateInput[]) => {
    return await prisma.user.createMany({
    data: users,
    skipDuplicates: true
    })
}