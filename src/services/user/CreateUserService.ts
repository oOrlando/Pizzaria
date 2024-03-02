import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRquest{
    name: String  ;
    email: String;
    password: String;
}


class CreateUserService{
    async execute({ name, email, password} : UserRquest){
        // verificar se foi enviado email
        if (!email){
            throw new Error("Email incorret")
        }

        // Verificar se esse email ja existe

        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email : String(email) 
            } 
        })

        if (userAlreadyExists){
            throw new Error("User already exists")
        }

        const passwordHash = await hash(String(password), 8)

        const user = await prismaClient.user.create({
            data:{
                name: String(name),
                email: String(email),
                password: passwordHash,
            },
            select:{
                id: true,
                name: true,
                email: true
            }
        })

        return  user; 
    }
}

export { CreateUserService }