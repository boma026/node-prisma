import { prisma } from "../libs/prisma";
import { Prisma } from "../generated/prisma";

//PRISMA CREATE
export const createUserModel = async (data: Prisma.UserCreateInput) => { // É um tipo TypeScript gerado automaticamente pelo Prisma com base no seu modelo User no schema.prisma.
        try{
        return await prisma.user.create({ data });
        }catch(e){
            return false
        }
}

export const createUsersModel = async (data:Prisma.UserCreateInput[]) => {
    try{
        return await prisma.user.createMany({ data, skipDuplicates: true }) //função que serve pra pular registros que são uniques do BD
    }catch(e){
        return false;
    }
}

//PRISMA FIND
export const getAllUsers = async () => {
//EXEMPLO DE PAGINAÇÃO

let page = 1

let skip = (page - 1) * 2

    try{
        return await prisma.user.findMany({
            select: {
                //Seleciona o que sera mostrado na resposta
                id: true,
                name:true,
                email:true,
                role: true,
                //contagem de itens que tem relação com a entidade
                _count: {
                    select: {
                        post: true
                    }
                },
                // mostra os posts tambem que cada usuario vai ter
                post:{
                    select: {
                        id: true,
                        title: true,
                        body: true
                    }
                }
            },
            //Forma que será ordenado os dados da requisiçao, a primeira é a mais importante e as subsequntes ocorrerão se der empate na primeira
            orderBy: [
                {name: "desc"},
                {id: "asc"}
            ],
            
            skip: skip, //Pula a quantidade de registros (no caso vai pular sempre de 2 em 2)
            take: 2 //Pega a quantidade de registros
        })
    }catch(e){
        return false
    }
}

export const getAllUsersYahoo = async () => {
    try{
        return await prisma.user.findMany({
            where: {
                email:{
                    endsWith: "yahoo.com.br"
                    //gte = greater than or equal
                    //gt = greater than
                    //lte = lower than or equal
                    //gte = lower than
                }
            },
            
            select: {
                //Seleciona o que sera mostrado na resposta
                id: true,
                name:true,
                email:true
            }
        })
    }catch(e){
        return false
    }
}

export const getUsersByPostTitle = async () => {
    try{
        return await prisma.user.findMany({
            where: {
                post:{
                    some: { //pegar usuarios em que "ALGUM" post dele tenha essa caracteristica (pode ser tb invez de "SOME" pode ser "EVERY" entao todos os posts dele TEM que ter essa caracteristica ou "NONE" em que nenhum pode ter essa caracteristica)
                        title: {
                            startsWith: "teste",
                        }
                    }
                }
            },
            
            select: {
                //Seleciona o que sera mostrado na resposta
                id: true,
                name:true,
                email:true
            }
        })
    }catch(e){
        return false
    }
}


export const getUserByEmail = async (email:string) => {
    try{
        return await prisma.user.findFirst({ // acha o primeiro registo com as caracterirsticas (pode ser usado tambem o findUnique, se os campos tiverem Unique)
            where: {email}, //procura o campo email no BD
            select: {
                //Seleciona o que sera mostrado na resposta
                id: true,
                name:true,
                email:true
            }
        })
    }catch(e){
        return false
    }
}

export const getUserByFilterTest = async () => {
    try{
        return await prisma.user.findMany({ 
            where: {
                OR: [
                    // ou tem id menor ou igual a 4 ou é hotmail
                    { id: {lte: 4}}, 
                    { email: {endsWith: "outlook.com.br"}}

                ],

            }, 
            select: {
                id: true,
                name:true,
                email:true
            }
        })
    }catch(e){
        return false
    }
}

//PRISMA UPDATE
export const updateUser = async (email: string) => {
    try{
        return await prisma.user.update({ 
            //Nesse where pega o usuario que deseja dar o update
            where: { email },
            //Nesse data mostra o que quer mudar
            data: {role: "ADMIN"}
            })           
        }catch(e){
        return false;
    }
}

export const updateUsers = async () => {
    try{
        return await prisma.user.updateMany({ 
            
            where: { 
                email:{ startsWith:"skeete" }
            },
            
            data: {role: "ADMIN"}
            })           
        }catch(e){
        return false;
    }
}

//PRISMA UPSERT
export const updateOrCreateUserModel = async (data: Prisma.UserCreateInput) => {
    const user = await prisma.user.upsert({
        //Primeiro ele procura o registro
        where: {
            email: data.email
        },
        //Se achar o item ele atualiza
        update: {
            // Pode deixar em branco se nao quer que atualize nada 
            role: "ADMIN" // no caso ele mudara pra admin
        },
        //Se nao achar ele cria
        create: data
        
    })
    return user
}

//PRISMA DELETE
export const deleteUserModel = async (email: string) => {
    const deletedUser = await prisma.user.delete({
        where: { email }
    })
    return deletedUser
}