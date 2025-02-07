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

export const getAllUsers = async () => {
    const users = prisma.user.findMany({
        where: {
            name: {
                startsWith: "j"
            }
        },
        
        select: {
            id: true,
            name: true,
            email: true,
            status: true
        }
    });
    return users;
}

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { email },
        select: {
            name: true,
            id: true
        }
    })
    return user;
}