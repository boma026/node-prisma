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
    let page = 1;
    const users = await prisma.user.findMany({
        skip: (page - 1) * 2,
        take: 2,

        where: {
            name: {
                startsWith: "j"
            },

            posts: {
                some: {
                    title: {
                        startsWith: "titulo"
                    }
                }
            },
        
            OR: [
                {
                    email: {
                        endsWith: "@hotmail.com"
                    }
                },
                {
                    email: {
                        endsWith: "gmail.com"
                    }
                }
            ]
        },
        
        select: {
            id: true,
            name: true,
            email: true,
            status: true,
            posts: {
                select: {
                    id: true,
                    title: true
                }
            },
            _count: {
                select: {
                    posts: true
                }
            }
        },

        orderBy: [
            {name: "asc"},
            {email: "asc"}
        ]
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

export const updateUser = async () => {
    const updateUser = await prisma.user.update({
        where: {
            email: "suporte@b7web.com.br"
        },
        data: {
            role: "ADMIN"
        }
    });
    return updateUser;
}